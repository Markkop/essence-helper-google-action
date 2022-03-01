import { ConversationV3, Card } from '@assistant/conversation'
import { Strings } from '../helpers/strings'
import { getIntentParameter } from '../helpers/parameters'
import { t } from 'i18next'
import { getIndefiniteArticleForPerkType, getPerk, parsePerkEffect } from '../helpers/perk'

export function getEquipmentPerkHandler(conv: ConversationV3) {
  const perkId = getIntentParameter(conv, 'perk')

  const perk = getPerk(perkId)
  if (!perk) {
    conv.add(t(Strings.PERK_NOT_FOUND))
    return
  }

  const perkName = perk.name
  if (!perk.effect) {
    conv.add(t(Strings.UNKNOWN_PERK_EFFECT))
    return
  }

  const indefiniteArticle = getIndefiniteArticleForPerkType(perk.type)
  const perkEffect = parsePerkEffect(perk.effect)
  const perkType = perk.type
  const accordingToSource = t(Strings.ACCORDING_TO_SOURCE, { source: 'ZenithMMO Fandom Wiki' })
  const effectSpeakOutput = t(Strings.PERK, { indefiniteArticle, perkName, perkType, perkEffect })
  const speakOutput = `${accordingToSource}, ${effectSpeakOutput}`
  conv.add(speakOutput)
  conv.add(new Card({
    title: perkName,
    text: speakOutput,
  }))
}
