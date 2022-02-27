const functions = require('firebase-functions');
const { app } = require('./app');

exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);
