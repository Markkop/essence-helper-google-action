import 'mocha'
import { ActionsOnGoogleTestManager } from '@assistant/conversation-testing'
import { startConversation } from './testUtils'

export function testPerk(test: ActionsOnGoogleTestManager, triggerPhrase: string) {
  it('retrieves perk effect from Start scene', async function() {
    await startConversation(test, triggerPhrase)
    await test.sendQuery('Equipment Perk')
    test.assertSpeech('Please, provide the name of an equipment perk.')
    await test.sendQuery('Shell')
    test.assertText('shell|Shell', { isRegexp: true })
    test.assertConversationEnded()
  })

  it('retrieves perk effect from global intent', async function() {
    await startConversation(test, triggerPhrase)
    await test.sendQuery('shell')
    test.assertText('shell|Shell', { isRegexp: true })
    test.assertConversationEnded()
  })

  it('retrieves perk effect from Start scene after slot input retry', async function() {
    await startConversation(test, triggerPhrase)
    await test.sendQuery('Equipment Perk')
    test.assertSpeech('Please, provide the name of an equipment perk.')
    await test.sendQuery('asdasdasd')
    test.assertSpeech('Sorry, I don\'t know that. Try again.')
    await test.sendQuery('shell')
    test.assertText('shell|Shell', { isRegexp: true })
    test.assertConversationEnded()
  })
}
