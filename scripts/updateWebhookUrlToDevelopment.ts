import { updateWebhookUrl } from './updateWebhookUrl'
import { Ngrok } from 'ngrok'
import axios from 'axios'

const LOCAL_NGROK_URL = 'http://localhost:4040/api/tunnels'

async function getNgrokUrl() {
  try {
    const response = await axios(LOCAL_NGROK_URL)
    const data = response.data as Ngrok.TunnelsResponse
    const secureTunnel = data.tunnels.find((tunnel) => tunnel.proto === 'https')
    if (!secureTunnel) return
    const publicUrl = secureTunnel.public_url
    return publicUrl
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED') {
      console.error('Looks like you\'re not running ngrok.')
      process.exit(1)
    }
    console.log(error)
    process.exit(1)
  }
}

async function updateWebhookUrlToProduction() {
  const publicUrl = await getNgrokUrl()
  if (!publicUrl) return
  updateWebhookUrl(publicUrl)
}

updateWebhookUrlToProduction()
