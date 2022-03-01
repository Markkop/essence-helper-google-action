import { init } from 'i18next'
import strings from './helpers/strings'
import { conversation } from '@assistant/conversation'
import { fallbackHandler } from './handlers/fallback'
import { getDiscoverableLocationHandler } from './handlers/getDiscoverableLocation'
import { getEquipmentPerkHandler } from './handlers/getEquipmentPerk'
import { welcomeHandler } from './handlers/welcome'

init({
  lng: 'en',
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

export default app
