const { t } = require('i18next');

exports.fallbackHandler = (conv) => {
  conv.add(t('FALLBACK'));
}
