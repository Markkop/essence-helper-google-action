import { ConversationV3 } from '@assistant/conversation'

import { t } from 'i18next'
import { getDiscoverable, getDiscoverableText } from '../helpers/discoverable'
import { getIntentParameter } from '../helpers/parameters'

export function getDiscoverableLocationHandler(conv: ConversationV3) {
  const providedDiscoverableName = getIntentParameter(conv, 'discoverable')

  if (!providedDiscoverableName) {
    conv.add(t('ASK_FOR_DISCOVERABLE'))
    return
  }

  const discoverable = getDiscoverable(providedDiscoverableName)

  if (!discoverable) {
    conv.add(t('ITEM_NOT_FOUND'))
    return
  }

  if (!discoverable.additionalText && !discoverable.sources?.length) {
    conv.add(t('UNKNOWN_SOURCE'))
    return
  }

  const discoverableText = getDiscoverableText(discoverable)
  const accordingToSource = t('ACCORDING_TO_SOURCE', { source: 'ZenithMMO Fandom Wiki' })
  const effectSpeakOutput = t('SOURCE', { sourceText: discoverableText })
  const speakOutput = `${accordingToSource}, ${effectSpeakOutput}`
  conv.add(speakOutput)
}

