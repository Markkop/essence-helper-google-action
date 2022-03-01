import { ConversationV3 } from '@assistant/conversation'
import { getIntentParameter } from '../helpers/parameters'
import { t } from 'i18next'
import { getIndefiniteArticleForPerkType, getPerk } from '../helpers/perk'

export function getEquipmentPerkHandler(conv: ConversationV3) {
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
    conv.add(t('UNKNOWN_PERK_EFFECT'))
    return
  }

  const indefiniteArticle = getIndefiniteArticleForPerkType(perk.type)
  const perkEffect = perk.effect.replace('by', '')
  const perkType = perk.type
  const accordingToSource = t('ACCORDING_TO_SOURCE', { source: 'ZenithMMO Fandom Wiki' })
  const effectSpeakOutput = t('PERK', { indefiniteArticle, perkName, perkType, perkEffect })
  const speakOutput = `${accordingToSource}, ${effectSpeakOutput}`
  conv.add(speakOutput)
}
