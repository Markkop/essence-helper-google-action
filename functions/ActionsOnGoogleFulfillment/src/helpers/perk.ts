import perks from '../data/perks.json'

type Perk = {
  name: string,
  effect?: string,
  type: string,
  tier1?: string,
  tier2?: string,
  tier3?: string,
}

export function getPerk(name: string) {
  return perks.find((perk: Perk) => perk.name.toLowerCase() === name.toLowerCase())
}

export function getIndefiniteArticleForPerkType(perkType: string) {
  if (perkType === 'active') return 'an'
  return 'a'
}
