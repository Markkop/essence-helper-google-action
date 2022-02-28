const {t} = require('i18next')
const {getIntentParameter} = require('./helpers')
const {getPerk, getIndefiniteArticleForPerkType} = require('./helper_perk')

exports.getEquipmentPerkHandler = (conv) => {
  const providedPerkName = getIntentParameter(conv, 'perk')

  if (!providedPerkName) {
    conv.add(t('ASK_FOR_PERK'))
    return
  }

  const perk = getPerk(providedPerkName)
  if (!perk) {
    conv.add(t('FALLBACK'))
    return
  }

  const perkName = perk.name
  if (!perk.effect) {
    conv.add(t(UNKNOWN_PERK_EFFECT))
    return
  }

  const indefiniteArticle = getIndefiniteArticleForPerkType(perk.type)
  const perkEffect = perk.effect.replace('by', '')
  const perkType = perk.type
  const accordingToSource = t('ACCORDING_TO_SOURCE', {source: 'ZenithMMO Fandom Wiki'})
  const effectSpeakOutput = t('PERK', {indefiniteArticle, perkName, perkType, perkEffect})
  const speakOutput = `${accordingToSource}, ${effectSpeakOutput}`
  conv.add(speakOutput)
}

