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

  // it('display simple', async function () {
  //   await startConversation(test);
  //   await test.sendQuery('Equipment Perk');
  //   const expectedExact =
  //     `This is the first simple response.This is the last simple response. ${CONTINUE_CONVO_PROMPT}`;
  //   // const expectedRegex =
  //   //   `This is .* ${CONTINUE_CONVO_PROMPT}`;
  //   // Assert speech is exact match using `isExact` argument.
  //   test.assertSpeech(expectedExact, { isExact: true });
  //   // Assert text with regex using `isRegex` argument.
  //   // test.assertText(expectedRegex, { isRegexp: true });
  //   test.assertIntent('simple');
  //   await test.sendStop();
  //   test.assertConversationEnded();
  // });

  // it('display image', async function () {
  //   await startConversation();
  //   await test.sendQuery('Image');
  //   const expected = `This is an image prompt!${CONTINUE_CONVO_PROMPT}`;
  //   test.assertSpeech(expected);
  //   test.assertText(expected);
  //   test.assertIntent('image');
  //   test.assertImage({
  //     url: 'https://developers.google.com/assistant/assistant_96.png',
  //     alt: 'Google Assistant logo'
  //   });
  //   await test.sendStop();
  //   test.assertConversationEnded();
  // });

  // it('display card', async function () {
  //   await startConversation();
  //   await test.sendQuery('Card');
  //   const expected = `This is a card.${CONTINUE_CONVO_PROMPT}`;
  //   test.assertSpeech(expected);
  //   test.assertText(expected);
  //   test.assertIntent('card');
  //   test.assertCard({
  //     title: 'Card Title',
  //     subtitle: 'Card Subtitle',
  //     text: 'Card Content',
  //     image: {
  //       url: 'https://developers.google.com/assistant/assistant_96.png',
  //       alt: 'Google Assistant logo',
  //       height: 0,
  //       width: 0
  //     }
  //   });
  //   await test.sendStop();
  //   test.assertConversationEnded();
  // });

  // it('display table', async function () {
  //   await startConversation();
  //   await test.sendQuery('Table');
  //   const expected = `This is a table.${CONTINUE_CONVO_PROMPT}`;
  //   test.assertSpeech(expected);
  //   test.assertText(expected);
  //   test.assertIntent('table');

  //   test.assertTable({
  //     title: 'Table Title',
  //     subtitle: 'Table Subtitle',
  //     image: {
  //       url: 'https://developers.google.com/assistant/assistant_96.png',
  //       alt: 'Google Assistant logo',
  //       height: 0,
  //       width: 0
  //     },
  //     columns: [
  //       { align: 'UNSPECIFIED', header: 'Column A' },
  //       { align: 'UNSPECIFIED', header: 'Column B' },
  //       { align: 'UNSPECIFIED', header: 'Column C' }
  //     ],
  //     rows: [
  //       { cells: [{ text: 'A1' }, { text: 'B1' }, { text: 'C1' }], divider: false },
  //       { cells: [{ text: 'A2' }, { text: 'B2' }, { text: 'C2' }], divider: false },
  //       { cells: [{ text: 'A3' }, { text: 'B3' }, { text: 'C3' }], divider: false }
  //     ],
  //   });
  //   await test.sendStop();
  //   test.assertConversationEnded();
  // });

  // it('display list', async function () {
  //   await startConversation();
  //   await test.sendQuery('List');
  //   const expected = `This is a list.`;
  //   test.assertSpeech(expected);
  //   test.assertText(expected);
  //   test.assertIntent('list');
  //   test.assertList({
  //     title: 'List title',
  //     subtitle: 'List subtitle',
  //     items:
  //       [{ key: 'ITEM_1' }, { key: 'ITEM_2' }, { key: 'ITEM_3' }, { key: 'ITEM_4' }]
  //   });
  //   await test.sendStop();
  //   test.assertConversationEnded();
  // });

  // it('display collection', async function () {
  //   await startConversation();
  //   await test.sendQuery('Collection');
  //   const expected = `This is a collection.`;
  //   test.assertSpeech(expected);
  //   test.assertText(expected);
  //   test.assertIntent('collection');
  //   test.assertCollection({
  //     title: 'Collection Title',
  //     subtitle: 'Collection subtitle',
  //     items:
  //       [{ key: 'ITEM_1' }, { key: 'ITEM_2' }, { key: 'ITEM_3' }, { key: 'ITEM_4' }]
  //   });
  //   await test.sendStop();
  //   test.assertConversationEnded();
  // });

  // it('display media', async function () {
  //   await startConversation();
  //   await test.sendQuery('Media');
  //   const expected = `This is a media response${CONTINUE_CONVO_PROMPT}`;
  //   test.assertSpeech(expected);
  //   test.assertText(expected);
  //   test.assertIntent('media');
  //   test.assertMedia({
  //     optionalMediaControls: ['PAUSED', 'STOPPED'] as any,
  //     mediaObjects: [{
  //       name: 'Media name',
  //       description: 'Media description',
  //       url:
  //         'https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg',
  //       image: {
  //         image: 'large',
  //         large: {
  //           url: 'https://developers.google.com/assistant/assistant_96.png',
  //           alt: 'Google Assistant logo',
  //           height: 0,
  //           width: 0
  //         }
  //       } as any
  //     }],
  //     mediaType: 'AUDIO'
  //   });
  //   await test.sendStop();
  //   test.assertConversationEnded();
  // });

  // it('select list item', async function () {
  //   await startConversation();
  //   await test.sendQuery('List');
  //   let expected = `This is a list.`;
  //   test.assertSpeech(expected);
  //   test.assertText(expected);
  //   test.assertIntent('list');
  //   test.assertConversationNotEnded();

  //   await test.sendQuery('Item #1');
  //   expected = `You selected item #1.${CONTINUE_CONVO_PROMPT}`;
  //   test.assertSpeech(expected);
  //   test.assertText(expected);
  //   test.assertScene('Prompts');
  //   await test.sendStop();
  //   test.assertConversationEnded();
  // });

  // it('select collection item', async function () {
  //   await startConversation();
  //   await test.sendQuery('Collection');
  //   let expected = `This is a collection.`;
  //   test.assertSpeech(expected);
  //   test.assertText(expected);
  //   test.assertIntent('collection');
  //   test.assertConversationNotEnded();

  //   await test.sendQuery('Item #1');
  //   expected = `You selected item #1.${CONTINUE_CONVO_PROMPT}`;
  //   test.assertSpeech(expected);
  //   test.assertText(expected);
  //   test.assertScene('Prompts');
  //   await test.sendStop();
  //   test.assertConversationEnded();
  // });
})
