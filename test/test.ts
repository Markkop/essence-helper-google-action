/* eslint-disable no-invalid-this */
/* eslint-disable max-len */
import 'mocha'
import { ActionsOnGoogleTestManager } from '@assistant/conversation-testing'
import { afterEachActionsOnGoogleTest, beforeAllActionsOnGoogleTests, loadProjectSettings, startConversation } from './testUtils'
import { testPerk } from './perks'

describe('Essence Helper Test Suite', function() {
  this.timeout(60000)
  const { projectId, triggerPhrase } = loadProjectSettings()
  const test = new ActionsOnGoogleTestManager({ projectId })

  before(() => beforeAllActionsOnGoogleTests(test))
  afterEach(() => afterEachActionsOnGoogleTest(test))

  it('works on Smart Display devices', async () => {
    test.setTestSurface('SMART_DISPLAY')
    await startConversation(test, triggerPhrase)
    await test.sendStop()
    test.assertConversationEnded()
  })

  describe('Perk intent', () => testPerk(test, triggerPhrase))
})
