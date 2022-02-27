"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEquipmentPerkHandler = void 0;
const perks_json_1 = __importDefault(require("../data/perks.json"));
const parameters_1 = require("../helpers/parameters");
function getEquipmentPerkHandler(conv) {
    const perk = (0, parameters_1.getIntentParameter)(conv, 'perk');
    if (!perk) {
        conv.add(`Please, provide the name of an equipment perk.`);
        return;
    }
    const foundPerk = perks_json_1.default.find(listedPerk => listedPerk.name.toLowerCase() === perk.toLowerCase());
    if (!foundPerk) {
        conv.add(`Sorry, I don't know that perk. Try again.`);
        return;
    }
    conv.add(`This perk's effect: ${foundPerk.effect}`);
}
exports.getEquipmentPerkHandler = getEquipmentPerkHandler;
//# sourceMappingURL=getEquipmentPerk.js.map