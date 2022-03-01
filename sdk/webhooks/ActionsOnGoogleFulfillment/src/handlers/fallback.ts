import { ConversationV3 } from '@assistant/conversation'
import { Strings } from '../helpers/strings'
import { t } from 'i18next'

export function fallbackHandler(conv: ConversationV3) {
  conv.add(t(Strings.FALLBACK))
}
