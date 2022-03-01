import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { load, dump } from 'js-yaml'

export function updateWebhookUrl(url: string) {
  const webhookSettingsPath = resolve(__dirname, '../sdk/webhooks/ActionsOnGoogleFulfillment.yaml')
  const actionsOnGoogleFulfillmentYaml = readFileSync(webhookSettingsPath, 'utf8')
  const settings = load(actionsOnGoogleFulfillmentYaml)
  const newSettings = {
    ...settings,
    httpsEndpoint: {
      ...settings.httpsEndpoint,
      baseUrl: url,
    },
  }
  writeFileSync(webhookSettingsPath, dump(newSettings, {
    lineWidth: -1,
  }))
  console.log('Webhook URL updated to:', url)
}

