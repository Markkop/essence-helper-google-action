const i18next = require('i18next')
const { conversation } = require('@assistant/conversation')
const { fallbackHandler } = require('./handler_fallback')
const { getEquipmentPerkHandler } = require('./handler_getEquipmentPerk')
const { getDiscoverableLocationHandler } = require('./handler_getDiscoverableLocation')
const { welcomeHandler } = require('./handler_welcome')
const { strings } = require('./strings')

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: strings,
    },
  },
})

const app = conversation({ debug: true })

app.handle('welcome', welcomeHandler)
app.handle('fallback', fallbackHandler)
app.handle('get_equipment_perk', getEquipmentPerkHandler)
app.handle('get_discoverable_location', getDiscoverableLocationHandler)

exports.app = app
