import { conversation } from '@assistant/conversation';
import functions from 'firebase-functions';
import { fallbackHandler } from './handlers/fallback';
import { getEquipmentPerkHandler } from './handlers/getEquipmentPerk';
import { welcomeHandler } from "./handlers/welcome";

const app = conversation({debug: true});

app.handle('welcome', welcomeHandler);
app.handle('fallback', fallbackHandler);
app.handle('get_equipment_perk', getEquipmentPerkHandler);

exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);
