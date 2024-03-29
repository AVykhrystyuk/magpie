// @flow strict

// lib
import { describe, it } from 'mocha';
import assert from 'assert';
import sinon from 'sinon';

// app
import { TagDetectorImpl } from './tag-detector';
import { Tag } from '../tag';
import type { TagId } from '../tag';

function mockTag(tagId: TagId): Tag {
  const mock = sinon.createStubInstance(Tag);
  mock.tagId = tagId;
  mock.isApplicableFor = sinon.spy(text => text && text.includes(tagId));
  return mock;
}

describe('TagDetectorImpl', () => {
  describe('Text detection', () => {
    it('returns nothing for blank text', () => {
      // arrange
      const tagDetectorImpl = new TagDetectorImpl([]);

      // act
      const results: Array<string[]> = [
        tagDetectorImpl.detectAll('   '),
        // flowlint unclear-type:off
        tagDetectorImpl.detectAll((null: any)),
        tagDetectorImpl.detectAll((undefined: any)),
        // flowlint unclear-type:error
      ];

      // assert
      results.forEach(a => {
        assert(a instanceof Array, 'Each result of detectAll should be an array');
        assert.equal(a.length, 0, 'The resulted array should be empty');
      });
    });

    it('returns all applicable tag IDs', () => {
      // arrange
      const tagMocks = [mockTag('FakeTagId'), mockTag('Java'), mockTag('CSharp')];
      const tagDetectorImpl = new TagDetectorImpl(tagMocks);

      // act
      const [javaTagId, cSharpTagId] = tagDetectorImpl.detectAll(' bla Java and CSharp bla ');

      // assert
      // $FlowExpectedError[method-unbinding]
      tagMocks.forEach(m => m.isApplicableFor.calledOnce);
      assert.equal(javaTagId, 'Java');
      assert.equal(cSharpTagId, 'CSharp');
    });
  });
});
