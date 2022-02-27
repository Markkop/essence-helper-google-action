"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntentParameter = void 0;
function getIntentParameter(conv, parameterName) {
    return conv.intent.params[parameterName] ? conv.intent.params[parameterName].resolved : null;
}
exports.getIntentParameter = getIntentParameter;
//# sourceMappingURL=parameters.js.map