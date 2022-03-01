import { Suggestion, ConversationV3 } from '@assistant/conversation'
import { Strings } from '../helpers/strings'
import { t } from 'i18next'

export function askForDiscoverable(conv: ConversationV3) {
  conv.add(t(Strings.ASK_FOR_DISCOVERABLE))
  conv.add(new Suggestion({ title: 'Apples' }))
  conv.add(new Suggestion({ title: 'Lemons' }))
  conv.add(new Suggestion({ title: 'Rare Mushroom' }))
}

