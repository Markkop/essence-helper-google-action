const { conversation } = require('@assistant/conversation');
const { fallbackHandler } = require('./fallback');
const { getEquipmentPerkHandler } = require('./getEquipmentPerk');
const { welcomeHandler } = require("./welcome");

const app = conversation({ debug: true });

app.handle('welcome', welcomeHandler);
app.handle('fallback', fallbackHandler);
app.handle('get_equipment_perk', getEquipmentPerkHandler);

exports.app = app
