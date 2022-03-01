import { Suggestion, ConversationV3 } from '@assistant/conversation'
import { Strings } from '../helpers/strings'
import { t } from 'i18next'

export function askForPerk(conv: ConversationV3) {
  conv.add(t(Strings.ASK_FOR_PERK))
  conv.add(new Suggestion({ title: 'Godking\'s Passion' }))
  conv.add(new Suggestion({ title: 'Banshee\'s Bellow' }))
  conv.add(new Suggestion({ title: 'Chrono Skip' }))
}

