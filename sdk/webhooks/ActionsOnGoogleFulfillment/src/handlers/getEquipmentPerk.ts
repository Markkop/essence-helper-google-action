import { ConversationV3 } from "@assistant/conversation";
import perks from '../data/perks.json'
import { getIntentParameter } from "../helpers/parameters";

export function getEquipmentPerkHandler(conv: ConversationV3) {
  const perk = getIntentParameter(conv, 'perk')

  if (!perk) {
    conv.add(`Please, provide the name of an equipment perk.`);
    return
  }

  const foundPerk = perks.find(listedPerk => listedPerk.name.toLowerCase() === perk.toLowerCase());
  if (!foundPerk) {
    conv.add(`Sorry, I don't know that perk. Try again.`);
    return;
  }
  conv.add(`This perk's effect: ${foundPerk.effect}`);
}