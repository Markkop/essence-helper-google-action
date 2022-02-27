"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_1 = require("@assistant/conversation");
const firebase_functions_1 = __importDefault(require("firebase-functions"));
const fallback_1 = require("./handlers/fallback");
const getEquipmentPerk_1 = require("./handlers/getEquipmentPerk");
const welcome_1 = require("./handlers/welcome");
const app = (0, conversation_1.conversation)({ debug: true });
app.handle('welcome', welcome_1.welcomeHandler);
app.handle('fallback', fallback_1.fallbackHandler);
app.handle('get_equipment_perk', getEquipmentPerk_1.getEquipmentPerkHandler);
exports.ActionsOnGoogleFulfillment = firebase_functions_1.default.https.onRequest(app);
//# sourceMappingURL=index.js.map