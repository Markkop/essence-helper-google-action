import { ConversationV3 } from '@assistant/conversation'
import { Strings } from '../helpers/strings'
import { t } from 'i18next'
import { getDiscoverable, getDiscoverableText } from '../helpers/discoverable'
import { getIntentParameter } from '../helpers/parameters'

export function getDiscoverableLocationHandler(conv: ConversationV3) {
  const providedDiscoverableName = getIntentParameter(conv, 'discoverable')
  const discoverable = getDiscoverable(providedDiscoverableName)

  if (!discoverable) {
    conv.add(t(Strings.ITEM_NOT_FOUND))
    return
  }

  if (!discoverable.additionalText && !discoverable.sources?.length) {
    conv.add(t(Strings.UNKNOWN_SOURCE))
    return
  }

  const discoverableText = getDiscoverableText(discoverable)
  const accordingToSource = t(Strings.ACCORDING_TO_SOURCE, { source: 'ZenithMMO Fandom Wiki' })
  const effectSpeakOutput = t(Strings.SOURCE, { sourceText: discoverableText })
  const speakOutput = `${accordingToSource}, ${effectSpeakOutput}`
  conv.add(speakOutput)
}

