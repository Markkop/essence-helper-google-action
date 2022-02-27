exports.getIntentParameter = (conv, parameterName) => {
  return conv.intent.params[parameterName] ? conv.intent.params[parameterName].resolved : null;
}

