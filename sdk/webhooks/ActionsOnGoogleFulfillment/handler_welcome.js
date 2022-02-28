const {t} = require('i18next')
const {Suggestion} = require('@assistant/conversation')

exports.welcomeHandler = (conv) => {
  conv.add(t('LAUNCH'))
  conv.add(new Suggestion({title: 'Equipment Perk'}))
  conv.add(new Suggestion({title: 'Cooking Ingredient'}))
}
