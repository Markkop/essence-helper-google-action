const {perks} = require('./data_perks')

exports.getPerk = (name) => {
  return perks.find((perk) => perk.name.toLowerCase() === name.toLowerCase())
}

exports.getIndefiniteArticleForPerkType = (perkType) => {
  if (perkType === 'active') return 'an'
  return 'a'
}
