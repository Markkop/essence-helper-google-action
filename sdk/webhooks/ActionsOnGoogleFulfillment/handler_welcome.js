const { t } = require('i18next');

exports.welcomeHandler = (conv) => {
  conv.add(t('LAUNCH'));
}
