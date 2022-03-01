/* eslint-disable max-len */
import 'mocha'
import { ActionsOnGoogleTestManager } from '@assistant/conversation-testing'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { load } from 'js-yaml'

const DEFAULT_LOCALE = 'en-US'
const DEFAULT_SURFACE = 'SMART_DISPLAY' // Should be PHONE, but: https://github.com/actions-on-google/assistant-conversation-testing-nodejs/issues/6
const CONTINUE_CONVO_PROMPT =
  'Hello Zenithian. I can get you the effects of an equipment perk or the location of a cooking ingredient. Which one would you like to know?'

export async function startConversation(test: ActionsOnGoogleTestManager, triggerPhrase: string) {
  await test.sendQuery(triggerPhrase)
  test.assertSpeech(CONTINUE_CONVO_PROMPT)
  test.assertText(CONTINUE_CONVO_PROMPT)
  test.assertIntent('actions.intent.MAIN')
  test.assertScene('Start')
}

export function loadProjectSettings(): Record<string, string> {
  try {
    const fileContents = readFileSync(resolve(__dirname, '../sdk/settings/settings.yaml'), 'utf8')
    const data = load(fileContents) as any
    const projectId = data.projectId as string
    const triggerPhrase = `Talk to ${data.localizedSettings.displayName}`
    return { projectId, triggerPhrase }
  } catch (e) {
    console.log(e)
    return {}
  }
}

export async function beforeAllActionsOnGoogleTests(test: ActionsOnGoogleTestManager) {
  await test.writePreviewFromDraft()
  test.setSuiteLocale(DEFAULT_LOCALE)
  test.setSuiteSurface(DEFAULT_SURFACE)
}

export function afterEachActionsOnGoogleTest(test: ActionsOnGoogleTestManager) {
  test.cleanUpAfterTest()
}
