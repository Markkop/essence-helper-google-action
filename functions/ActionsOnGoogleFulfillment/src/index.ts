import express from 'express'
import * as functions from 'firebase-functions'
import ActionsOnGoogleApp from './app'

const expressApp = express()

expressApp.use(express.json())

expressApp.post('/', ActionsOnGoogleApp)

expressApp.get('/', (req, res) => {
  res.send('CONFIRMED RECEIPT OF GET.')
})

if (process.env.IS_LOCAL_DEV) {
  const PORT = 8000
  expressApp.listen(PORT, () =>
    console.log(`*** SERVER RUNNING LOCALLY ON PORT ${PORT} ***`)
  )
} else {
  console.log('*** NOT LOCALLY SERVED - OR - LOCAL ENV VAR NOT SET  ****')
}

exports.fulfillmentExpressServer = functions.https.onRequest(expressApp)
exports.ActionsOnGoogleFulfillment = functions.https.onRequest(ActionsOnGoogleApp)
