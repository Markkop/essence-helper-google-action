import perks from '../data/perks.json'

type Perk = {
  id: string,
  name: string,
  effect?: string,
  type: string,
  tier1?: string,
  tier2?: string,
  tier3?: string,
}

export function getPerk(id: string) {
  return perks.find((perk: Perk) => perk.id.toLowerCase() === id.toLowerCase())
}

export function getIndefiniteArticleForPerkType(perkType: string) {
  if (perkType === 'active') return 'an'
  return 'a'
}

export function parsePerkEffect(effect: string) {
  return effect
    .replace(/by|\[|\]/g, '')
    .replace(/CD/g, 'cooldown')
    .replace(/([0-9])s/g, '$1 seconds')
}
