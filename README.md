# 🥽 Essence Helper (Google Action)

A Google Action that provides information about the Zenith VR MMORPG.  
Check its Alexa Skill version [here](https://github.com/Markkop/essence-helper-alexa-skill).

## Get the Skill

![print](https://i.imgur.com/6SPXS9t.png)

https://assistant.google.com/services/a/uid/0000005dbaeb2c8d?hl=en-US

## Usage

```
"Ok Google, talk to Essence helper"
"Ok Google, ask Essence Helper to tell me the effect of the perk shell"
"Ok Google, ask Essence Helper to provide me the effect of blood thief"
"Ok Google, ask Essence Helper to get the effect of the perk brain freeze"
"Ok Google, ask Essence Helper to get the location of apples"
"Ok Google, ask Essence Helper to provide me lemons location"
```

## Development and Testing

### Local Development

- Setup a Ngrok config with token in your computer following [these instructions](https://dashboard.ngrok.com/get-started/setup)
- Run `npm run tunnel` to start Ngrok
- Run `npm run dev` to update Webhook URL with Ngrok public URL and watch for code changes

### Testing

- Setup a Service Account following [these instructions](https://github.com/actions-on-google/actions-builder-conversation-components-nodejs/blob/master/README.md#running-tests)
- If you want to run automated tests with remote code: run `npm run set:webhook:prod`
- If you want to run automated tests with local code: run `npm run set:webhook:dev`
- Run `npm run test`

### Deployment

- Update `scripts/updateWebhookUrlToProduction.ts` file with the Webhook Production URL
- Run `npm run prod` to update it in the remote project and deploy webhook function
- Proceed with Google's verification process in [Google Actions Console](https://console.actions.google.com/)
### References:

- [Actions SDK and Builder quick start guide](https://developers.google.com/assistant/conversational/quickstart)
- [How to implement local fulfillment for Google Assistant actions using Dialogflow](https://www.freecodecamp.org/news/how-to-implement-local-fulfillment-for-google-assistant-actions-using-dialogflow-1b3b3a13075f/)
- [Use TypeScript for Cloud Functions](https://firebase.google.com/docs/functions/typescript)