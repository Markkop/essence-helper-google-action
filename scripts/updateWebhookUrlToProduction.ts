import { updateWebhookUrl } from './updateWebhookUrl'

const CLOUD_FUNCTION_URL = 'https://us-central1-essence-helper.cloudfunctions.net/ActionsOnGoogleFulfillment'

function updateWebhookUrlToProduction() {
  updateWebhookUrl(CLOUD_FUNCTION_URL)
}

updateWebhookUrlToProduction()
