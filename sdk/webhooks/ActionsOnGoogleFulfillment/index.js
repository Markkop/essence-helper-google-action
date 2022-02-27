/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {
  conversation,
  Canvas,
} = require('@assistant/conversation');
const functions = require('firebase-functions');

const INSTRUCTIONS = 'Do you want me to change color or pause spinning?';

const CANVAS_URL = 'https://essence-helper.web.app';

const tints = {
  black: 0x000000,
  blue: 0x0000FF,
  green: 0x00FF00,
  cyan: 0x00FFFF,
  indigo: 0x4B0082,
  magenta: 0x6A0DAD,
  maroon: 0x800000,
  grey: 0x808080,
  brown: 0xA52A2A,
  violet: 0xEE82EE,
  red: 0xFF0000,
  purple: 0xFF00FF,
  orange: 0xFFA500,
  pink: 0xFFC0CB,
  yellow: 0xFFFF00,
  white: 0xFFFFFF,
};

const perks = [
    {
      "name": "Banshee's Bellow",
      "effect": "When struck cause [150% AP stagger] in a [5m AoE]. (15s CD)",
      "type": "active"
    },
    {
      "name": "Blood Thief",
      "effect": "On kill, restores HP by [100%] of AP.",
      "type": "active"
    },
    {
      "name": "Body Meld",
      "effect": "On kill, grants [+100/130/130] Constitution for [30s] (Cooldown: [10s]) Stacks 3 times at kill 3 and kill 5 . (affects max HP and AP).",
      "type": "active"
    },
    {
      "name": "Brain Freeze",
      "effect": "(possibly increases stagger)",
      "type": "active"
    },
    {
      "name": "Breath Stealer",
      "effect": "",
      "type": "active"
    },
    {
      "name": "Bunker",
      "effect": "On being hit, [10%] chance to gain [30% armor] for [5s]. (Cooldown: [10s])",
      "type": "active"
    },
    {
      "name": "Chrono Skip",
      "effect": "On being hit, [10%] chance to cause [30% slow attack speed] in a [5m AoE] for [5s]. (Cooldown: [10s])",
      "type": "active"
    },
    {
      "name": "Death's Chariot",
      "effect": "On kill, grants [+5%] movement speed for [30s]. (Cooldown: [10s]) Stacks to a maximum of +15%",
      "type": "active"
    },
    {
      "name": "Deep Breathing",
      "effect": "On ability use, increases AP by [2%] for [15s] (Cooldown: [5s]).",
      "type": "active"
    },
    {
      "name": "Defiant",
      "effect": "On ability use, restores HP by [35%] of AP. (Cooldown: [5s]). Does not require hitting an enemy with the ability.",
      "type": "active"
    },
    {
      "name": "Essence Thief",
      "effect": "On kill, restores [+?] Mana/Rage.",
      "type": "active"
    },
    {
      "name": "Fighting Spirit",
      "effect": "On fully charged weapon hit, heals self for 75HP",
      "type": "active"
    },
    {
      "name": "Flare",
      "effect": "Attacks cause a [50% AP Damage] explosion in a [4m AoE]. (20s CD)",
      "type": "active"
    },
    {
      "name": "Flow State",
      "effect": "",
      "type": "active"
    },
    {
      "name": "Helping Hand",
      "effect": "",
      "type": "active"
    },
    {
      "name": "Inner Rage",
      "effect": "",
      "type": "active"
    },
    {
      "name": "Killer's Edge",
      "effect": "On kill, grants [+10%] Crit Chance for [15s]. Also have observed this being applied to allies. Doesn't seem to stack.",
      "type": "active"
    },
    {
      "name": "Kingmaker",
      "effect": "When hitting an ally, grant them [15% AP] for [5s]. (Cooldown: [20s])",
      "type": "active"
    },
    {
      "name": "Marrow Stealer",
      "effect": "",
      "type": "active"
    },
    {
      "name": "Mind Meld",
      "effect": "On kill, grants [+100/130/130] Affinity for [30s] (Cooldown: [10s]) Stacks 3 times. (affects max Mana/Rage and AP).",
      "type": "active"
    },
    {
      "name": "Pain Link",
      "effect": "Reflects damage taken to an enemy\n<p>Possibly instead - On being hit, chance to cause [-50%] reduced movement speed and attack speed in enemies. Possibly an AoE effect.\n</p>",
      "type": "active"
    },
    {
      "name": "Pit Fighter",
      "effect": "On being hit, chance to gain [3%] Constitution for [15s]. Stacks 3 times. (Cooldown: 5s)",
      "type": "active"
    },
    {
      "name": "Scatter",
      "effect": "On being hit, [10%] chance to gain [15% movement speed] for [?s]. - incomplete guess.",
      "type": "active"
    },
    {
      "name": "Shelter",
      "effect": "",
      "type": "active"
    },
    {
      "name": "Soul Shock",
      "effect": "On hit, deal an additional [+25% AP] damage as a separate instance (Cooldown: [?s]). Procs shortly after the initial hit. Could instead be chance to deal damage, but without a cooldown.",
      "type": "active"
    },
    {
      "name": "Spirit Meld",
      "effect": "On kill, grants [+100/130/130] Attack for [30s] (Cooldown: [10s]) Stacks 3 times. (affects Crit Chance and AP).",
      "type": "active"
    },
    {
      "name": "Super  Heated",
      "effect": "On hit, deals [100% AP] damage every [1s] for [5s]. Hit can be blaster or ability (even a non-damaging ability). I believe tiers 2 and 3 will increase the damage ticks beyond 5.",
      "type": "active"
    },
    {
      "name": "Thick As Thieves",
      "effect": "When hitting an ally, grant them [+15%] movement speed for [30s]. Can be applied via splash damage. Buff is not applied to self. Will stack with other speed buffs.",
      "type": "active"
    },
    {
      "name": "Effect",
      "type": "passive"
    },
    {
      "name": "Well Rounded",
      "effect": "increases Attack, Constitution, and Affinity by",
      "tier1": "10",
      "tier2": "??",
      "tier3": "15",
      "type": "passive"
    },
    {
      "name": "Warlock",
      "effect": "increases Attack and Affinity by",
      "tier1": "14",
      "tier2": "??",
      "tier3": "??",
      "type": "passive"
    },
    {
      "name": "Brawler",
      "effect": "increases Attack and Constitution by",
      "tier1": "14",
      "tier2": "??",
      "tier3": "??",
      "type": "passive"
    },
    {
      "name": "Exemplar",
      "effect": "increases Affinity and Constitution by",
      "tier1": "14",
      "tier2": "??",
      "tier3": "??",
      "type": "passive"
    },
    {
      "name": "Mighty",
      "effect": "increases Attack by",
      "tier1": "20",
      "tier2": "30",
      "tier3": "30",
      "type": "passive"
    },
    {
      "name": "Brainiac",
      "effect": "increases Affinity by",
      "tier1": "24",
      "tier2": "36",
      "tier3": "36",
      "type": "passive"
    },
    {
      "name": "Vanguard",
      "effect": "increases Constitution by",
      "tier1": "24",
      "tier2": "36",
      "tier3": "36",
      "type": "passive"
    },
    {
      "name": "Eagle Eye",
      "effect": "increases Crit Chance by",
      "tier1": "4%",
      "tier2": "?%",
      "tier3": "7%",
      "type": "passive"
    },
    {
      "name": "Slayer",
      "effect": "Increases Crit Power by",
      "tier1": "",
      "tier2": "",
      "tier3": "",
      "type": "passive"
    },
    {
      "name": "Sadistic",
      "effect": "Increases Crit Chance and Crit Power by",
      "tier1": "",
      "tier2": "",
      "tier3": "",
      "type": "passive"
    },
    {
      "name": "Sprinter",
      "effect": "increases Stamina by",
      "tier1": "1",
      "tier2": "",
      "tier3": "",
      "type": "passive"
    },
    {
      "name": "Oxygenator",
      "effect": "Increases Stamina Regen",
      "tier1": "",
      "tier2": "",
      "tier3": "",
      "type": "passive"
    },
    {
      "name": "Lightfoot",
      "effect": "Increases movement speed",
      "tier1": "",
      "tier2": "",
      "tier3": "",
      "type": "passive"
    },
    {
      "name": "Steadfast",
      "effect": "Increases Health by",
      "tier1": "300",
      "tier2": "450",
      "tier3": "450",
      "type": "passive"
    },
    {
      "name": "Automend",
      "effect": "Increases natural Health regeneration by",
      "tier1": "+100%",
      "tier2": "",
      "tier3": "",
      "type": "passive"
    },
    {
      "name": "Essence Flow",
      "effect": "Increases resource regeneration",
      "tier1": "",
      "tier2": "",
      "tier3": "",
      "type": "passive"
    },
    {
      "name": "Shell",
      "effect": "Increases armor based on tier. (does not actually increase armor)",
      "tier1": "",
      "tier2": "",
      "tier3": "",
      "type": "passive"
    },
    {
      "name": "Robust",
      "effect": "slightly increases Health by",
      "tier1": "100",
      "type": "passive"
    },
    {
      "name": "Assistant",
      "effect": "slightly increases Affinity by",
      "tier1": "10",
      "type": "passive"
    },
    {
      "name": "Brutal",
      "effect": "slightly increases Attack by",
      "tier1": "10",
      "type": "passive"
    },
    {
      "name": "Bastion",
      "effect": "slightly increases Constitution by",
      "tier1": "10",
      "type": "passive"
    },
    {
      "name": "Ferocious",
      "effect": "Moderately increases Attack by",
      "tier1": "20",
      "type": "passive"
    }
  ];

const app = conversation({debug: true});

app.handle('welcome', (conv) => {
  conv.add('Hello Zenithian. I can get you the effects of an equipment perk or the location of a cooking ingredient. Which one would you like to know?');
});

app.handle('fallback', (conv) => {
  conv.add(`I don't understand. You can change my color or pause spinning.`);
});

app.handle('perk', (conv) => {
  const perk =
    conv.intent.params.perk? conv.intent.params.perk.resolved : null;
  const foundPerk = perks.find(listedPerk => listedPerk.name.toLowerCase() === perk.toLowerCase());
  if (!foundPerk) {
    conv.add(`Sorry, I don't know that perk. Try again.`);
    conv.add(new Canvas());
    return;
  }
 	conv.add(`This perk's effect: ${foundPerk.effect}`);
});

app.handle('change_color', (conv) => {
  const color =
    conv.intent.params.color? conv.intent.params.color.resolved : null;
  if (!(color in tints)) {
    conv.add(`Sorry, I don't know that color. Try red, blue, or green!`);
    conv.add(new Canvas());
    return;
  }
  conv.add(`Ok, I changed my color to ${color}. What else?`);
    conv.add(new Canvas({
      data: {
        command: 'TINT',
        tint: tints[color],
      },
    }));
});

app.handle('start_spin', (conv) => {
  conv.add(`Ok, I'm spinning. What else?`);
  conv.add(new Canvas({
    data: {
      command: 'SPIN',
      spin: true,
    },
  }));
});

app.handle('stop_spin', (conv) => {
  conv.add('Ok, I paused spinning. What else?');
  conv.add(new Canvas({
    data: {
      command: 'SPIN',
      spin: false,
    },
  }));
});

app.handle('instructions', (conv) => {
  conv.add(INSTRUCTIONS);
  conv.add(new Canvas());
});

app.handle('restart', (conv) => {
  conv.add(INSTRUCTIONS);
  conv.add(new Canvas({
    data: {
      command: 'RESTART_GAME',
    },
  }));
});

exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);
