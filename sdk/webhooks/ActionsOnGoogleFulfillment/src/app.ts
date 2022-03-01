
import { conversation } from '@assistant/conversation'
import { askForDiscoverable } from './handlers/askForDiscoverable'
import { askForPerk } from './handlers/askForPerk'
import { fallbackHandler } from './handlers/fallback'
import { getDiscoverableLocationHandler } from './handlers/getDiscoverableLocation'
import { getEquipmentPerkHandler } from './handlers/getEquipmentPerk'
import { welcomeHandler } from './handlers/welcome'
import { i18nMiddleware } from './middlewares/i18n'

const app = conversation({ debug: true })

app.middleware(i18nMiddleware)
app.handle('welcome', welcomeHandler)
app.handle('fallback', fallbackHandler)
app.handle('get_equipment_perk', getEquipmentPerkHandler)
app.handle('get_discoverable_location', getDiscoverableLocationHandler)
app.handle('ask_for_discoverable', askForDiscoverable)
app.handle('ask_for_perk', askForPerk)

export default app
