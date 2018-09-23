// @flow

// lib
import { describe, it } from 'mocha';
import assert from 'assert';
import sinon from 'sinon';

// app
import TagAnalyzerImpl from './tag-analyzer';
import type { TagAnalysisResult } from '../tag-analyzer';
import { TagDetector } from '../../tag-detection';
import type { TagId } from '../../tag-detection/tag';
import { BlackListedWordsFinder } from '../../black-words-finder';
import { WhiteListedWordsFinder } from '../../white-words-finder';
import { ItRelatedWordsFinder } from '../../it-related-words-finder';

function mockTagDetector(foundTagIds: TagId[]): TagDetector {
  const mock = sinon.createStubInstance(TagDetector);
  mock.detectAll = sinon.spy(text => (text ? foundTagIds : []));
  return mock;
}

function mockBlackListedWordsFinder(foundBlackWords: string[]): BlackListedWordsFinder {
  const mock = sinon.createStubInstance(BlackListedWordsFinder);
  mock.findAll = sinon.spy(text => (text ? foundBlackWords : []));
  return mock;
}

function mockWhiteListedWordsFinder(foundWhiteWords: string[]): WhiteListedWordsFinder {
  const mock = sinon.createStubInstance(WhiteListedWordsFinder);
  mock.findAll = sinon.spy(text => (text ? foundWhiteWords : []));
  return mock;
}

function mockItRelatedWordsFinder(foundWords: string[]): ItRelatedWordsFinder {
  const mock = sinon.createStubInstance(ItRelatedWordsFinder);
  mock.findAll = sinon.spy(text => (text ? foundWords : []));
  return mock;
}

function emptyResultCollectionExpected(collectionName: string): string {
  return `Result should not have collection of ${collectionName}`;
}

const invalidResultExpectedErrorMessage = 'Result should not be valid';
const validResultExpectedErrorMessage = 'Result should be valid';

describe('TagAnalyzerImpl', () => {
  describe('Text analysis', () => {
    describe('returns invalid result', () => {
      it('for blank text', () => {
        // arrange
        const tagAnalyzerImpl = new TagAnalyzerImpl(null, null, null, null);

        // act
        const results: Array<TagAnalysisResult> = [
          tagAnalyzerImpl.analyze(''),
          tagAnalyzerImpl.analyze('   '),
          tagAnalyzerImpl.analyze((null: any)),
          tagAnalyzerImpl.analyze((undefined: any)),
        ];

        // assert
        results.forEach(result => {
          assert.ok(!result.valid, invalidResultExpectedErrorMessage);
          assert.equal(result.blackWords.length, 0, emptyResultCollectionExpected('black words'));
          assert.equal(result.whiteWords.length, 0, emptyResultCollectionExpected('white words'));
          assert.equal(result.tagIds.length, 0, emptyResultCollectionExpected('tag ids'));
        });
      });

      it('when text only does not have any of the following: "Tags", "Black" words, "White" words', () => {
        // arrange
        const tagAnalyzerImpl = new TagAnalyzerImpl(
          mockTagDetector([]),
          mockBlackListedWordsFinder([]),
          mockWhiteListedWordsFinder([]),
          mockItRelatedWordsFinder([])
        );

        // act
        const result = tagAnalyzerImpl.analyze(' some text ');

        // assert
        assert.equal(result.tagIds.length, 0);
        assert.equal(result.blackWords.length, 0);
        assert.equal(result.whiteWords.length, 0);
        assert.ok(!result.valid, invalidResultExpectedErrorMessage);
      });

      it('when text only has "White" words (does not have both "Tags" and "Black" words)', () => {
        // arrange
        const tagAnalyzerImpl = new TagAnalyzerImpl(
          mockTagDetector([]),
          mockBlackListedWordsFinder([]),
          mockWhiteListedWordsFinder(['meet-up', 'conference']),
          mockItRelatedWordsFinder([])
        );

        // act
        const result = tagAnalyzerImpl.analyze(' some text ');

        // assert
        assert.equal(result.tagIds.length, 0);
        assert.equal(result.blackWords.length, 0);
        assert.equal(result.whiteWords.length, 2);
        assert.ok(!result.valid, invalidResultExpectedErrorMessage);
      });

      it('when text only has "Black" words (does not have both "Tags" and "White" words)', () => {
        // arrange
        const tagAnalyzerImpl = new TagAnalyzerImpl(
          mockTagDetector([]),
          mockBlackListedWordsFinder(['Воркшоп', 'Тренинг']),
          mockWhiteListedWordsFinder([]),
          mockItRelatedWordsFinder([])
        );

        // act
        const result = tagAnalyzerImpl.analyze(' some text ');

        // assert
        assert.equal(result.tagIds.length, 0);
        assert.equal(result.blackWords.length, 2);
        assert.equal(result.whiteWords.length, 0);
        assert.ok(!result.valid, invalidResultExpectedErrorMessage);
      });

      it('when text does not have "Tags" but has both "White" and "Black" words', () => {
        // arrange
        const tagAnalyzerImpl = new TagAnalyzerImpl(
          mockTagDetector([]),
          mockBlackListedWordsFinder(['Воркшоп', 'Тренинг']),
          mockWhiteListedWordsFinder(['meet-up', 'conference']),
          mockItRelatedWordsFinder([])
        );

        // act
        const result = tagAnalyzerImpl.analyze(' some text ');

        // assert
        assert.equal(result.tagIds.length, 0);
        assert.equal(result.blackWords.length, 2);
        assert.equal(result.whiteWords.length, 2);
        assert.ok(!result.valid, invalidResultExpectedErrorMessage);
      });
    });

    describe('returns valid result', () => {
      it('when text has "Tags" and both "White" and "Black" words', () => {
        // arrange
        const tagAnalyzerImpl = new TagAnalyzerImpl(
          mockTagDetector(['JavaScript', 'DotNet']),
          mockBlackListedWordsFinder(['Воркшоп', 'Тренинг']),
          mockWhiteListedWordsFinder(['meet-up', 'conference']),
          mockItRelatedWordsFinder([])
        );

        // act
        const result = tagAnalyzerImpl.analyze(' some text ');

        // assert
        assert.equal(result.tagIds.length, 2);
        assert.equal(result.blackWords.length, 2);
        assert.equal(result.whiteWords.length, 2);
        assert.ok(result.valid, validResultExpectedErrorMessage);
      });

      it('when text has "Tags" and both "White" and "Black" words but "Black" words dominate', () => {
        // arrange
        const tagAnalyzerImpl = new TagAnalyzerImpl(
          mockTagDetector(['JavaScript', 'DotNet']),
          mockBlackListedWordsFinder(Array(6).fill('Воркшоп')),
          mockWhiteListedWordsFinder(['meet-up', 'conference']),
          mockItRelatedWordsFinder([])
        );

        // act
        const result = tagAnalyzerImpl.analyze(' some text ');

        // assert
        assert.equal(result.tagIds.length, 2);
        assert.equal(result.blackWords.length, 6);
        assert.equal(result.whiteWords.length, 2);
        assert.ok(!result.valid, invalidResultExpectedErrorMessage);
      });

      it('when text has "Tags" and "White" words (does NOT have "Black" words)', () => {
        // arrange
        const tagAnalyzerImpl = new TagAnalyzerImpl(
          mockTagDetector(['JavaScript', 'DotNet']),
          mockBlackListedWordsFinder([]),
          mockWhiteListedWordsFinder(['meet-up', 'conference']),
          mockItRelatedWordsFinder([])
        );

        // act
        const result = tagAnalyzerImpl.analyze(' some text ');

        // assert
        assert.equal(result.tagIds.length, 2);
        assert.equal(result.blackWords.length, 0);
        assert.equal(result.whiteWords.length, 2);
        assert.ok(result.valid, validResultExpectedErrorMessage);
      });

      it('when text has only "Tags" (does NOT have both "White" and "Black" words)', () => {
        // arrange
        const tagAnalyzerImpl = new TagAnalyzerImpl(
          mockTagDetector(['JavaScript', 'DotNet']),
          mockBlackListedWordsFinder([]),
          mockWhiteListedWordsFinder([]),
          mockItRelatedWordsFinder([])
        );

        // act
        const result = tagAnalyzerImpl.analyze(' some text ');

        // assert
        assert.equal(result.tagIds.length, 2);
        assert.equal(result.blackWords.length, 0);
        assert.equal(result.whiteWords.length, 0);
        assert.ok(result.valid, validResultExpectedErrorMessage);
      });
    });
  });
});
