// @flow strict

// lib
import { describe, it, beforeEach } from 'mocha';
import assert from 'assert';

// app
import FrontEndTag from './front-end-tag';

function assertTagIsApplicable(tag: FrontEndTag, text: string): void {
  assert.ok(
    tag.isApplicableFor(text),
    `Tag should be applicable for the following text: '${text}'`
  );
}

/*
function assertTagIsNotApplicable(tag: FrontEndTag, text: string): void {
  assert.ok(
    !tag.isApplicableFor(text),
    `Tag should NOT be applicable for the following text: '${text}'`
  );
}
*/

describe('FrontEndTag', () => {
  let assertTextAppliesToTag;
  // let assertTextDoesNotApplyToTag;
  let tag;

  beforeEach(() => {
    tag = new FrontEndTag();
    assertTextAppliesToTag = assertTagIsApplicable.bind(null, tag);
    // assertTextDoesNotApplyToTag = assertTagIsNotApplicable.bind(null, tag);
  });

  it('it has tagId equals to "FrontEndTag"', () => {
    assert.equal(tag.tagId, 'FrontEnd');
  });

  describe('Text case insensitive discovering', () => {
    it('when "Frontend" word is used in the text', () => {
      const applicableTexts = [
        'Nsk Tech Talks #6 по фронтенду',
        'Терки про фронтенД терки ттт',
        'тест ФронТендер тест ',
        'ss frontend conf',
        'front-end demo',
        'front-enders demo',
        'demo frontender demo',
      ];

      applicableTexts.forEach(assertTextAppliesToTag);
    });
  });
});
