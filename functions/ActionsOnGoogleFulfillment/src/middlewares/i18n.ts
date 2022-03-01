import { init } from 'i18next'
import { strings } from '../helpers/strings'
import { ConversationV3 } from '@assistant/conversation'

export function i18nMiddleware(conv: ConversationV3) {
  init({
    lng: conv.user.locale,
    resources: strings,
    returnObjects: true,
    interpolation: {
      escapeValue: false,
    },
  })
}
