const express = require('express')
const bodyParser = require('body-parser')
const functions = require('firebase-functions')

const ActionsOnGoogleApp = require('./app')
const expressApp = express().use(bodyParser.json())

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
