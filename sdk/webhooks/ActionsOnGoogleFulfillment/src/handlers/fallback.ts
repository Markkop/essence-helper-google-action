import { ConversationV3 } from '@assistant/conversation'
import { t } from 'i18next'

export function fallbackHandler(conv: ConversationV3) {
  conv.add(t('FALLBACK'))
}
