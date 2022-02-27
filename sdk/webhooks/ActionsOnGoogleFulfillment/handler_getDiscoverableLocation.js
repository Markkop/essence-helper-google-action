const { t } = require('i18next');
const { getIntentParameter } = require("./helpers");
const { getDiscoverable, getDiscoverableText } = require('./helper_discoverable');

exports.getDiscoverableLocationHandler = (conv) => {
  const providedDiscoverableName = getIntentParameter(conv, 'discoverable')

  if (!providedDiscoverableName) {
    conv.add(t('ASK_FOR_DISCOVERABLE'));
    return
  }

  const discoverable = getDiscoverable(providedDiscoverableName);

  if (!discoverable) {
    conv.add(t('ITEM_NOT_FOUND'));
    return
  }

  const discoverableName = discoverable.title
  if (!discoverable.additionalText && !discoverable.sources.length) {
    conv.add(t('UNKNOWN_SOURCE'));
    return
  }

  const discoverableText = getDiscoverableText(discoverable)
  const accordingToSource = t(ACCORDING_TO_SOURCE, { source: 'ZenithMMO Fandom Wiki' })
  const effectSpeakOutput = t(SOURCE, { sourceText: discoverableText })
  const speakOutput = `${accordingToSource}, ${effectSpeakOutput}`
  conv.add(speakOutput);
}

