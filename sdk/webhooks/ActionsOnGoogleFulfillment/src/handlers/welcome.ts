import { ConversationV3, Suggestion } from '@assistant/conversation'
import { t } from 'i18next'

export function welcomeHandler(conv: ConversationV3) {
  conv.add(t('LAUNCH'))
  conv.add(new Suggestion({ title: 'Equipment Perk' }))
  conv.add(new Suggestion({ title: 'Cooking Ingredient' }))
}
