// @flow strict

// lib
import { describe, it, beforeEach } from 'mocha';
import assert from 'assert';

// app
import DevOpsTag from './devops-tag';

function assertTagIsApplicable(tag: DevOpsTag, text: string): void {
  assert.ok(
    tag.isApplicableFor(text),
    `Tag should be applicable for the following text: '${text}'`
  );
}

function assertTagIsNotApplicable(tag: DevOpsTag, text: string): void {
  assert.ok(
    !tag.isApplicableFor(text),
    `Tag should NOT be applicable for the following text: '${text}'`
  );
}

describe('DevOpsTag', () => {
  let assertTextAppliesToTag;
  let assertTextDoesNotApplyToTag;
  let tag;

  beforeEach(() => {
    tag = new DevOpsTag();
    assertTextAppliesToTag = assertTagIsApplicable.bind(null, tag);
    assertTextDoesNotApplyToTag = assertTagIsNotApplicable.bind(null, tag);
  });

  it('it has tagId equals to "DevOps"', () => {
    assert.equal(tag.tagId, 'DevOps');
  });

  describe('Text case insensitive discovering', () => {
    it('when "DevOps" is part of a word', () => {
      const applicableTexts = ['тест DevOps тест', 'тест devops демо ', 'conf devops conf '];

      applicableTexts.forEach(assertTextAppliesToTag);
    });
  });

  describe('Text ignoring', () => {
    it('for not related to tag text', () => {
      // prettier-ignore
      const notApplicableTexts = [
        ' Ничего общего '
      ];

      // assert
      notApplicableTexts.forEach(assertTextDoesNotApplyToTag);
    });
  });
});
