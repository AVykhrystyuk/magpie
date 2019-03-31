// @flow strict

// lib
import { beforeEach, describe, it } from 'mocha';
import assert from 'assert';

// app
import ItRelatedWordsFinderImpl from './it-related-words-finder';

describe('ItRelatedWordsFinderImpl', () => {
  let itRelatedWordsFinderImpl: ItRelatedWordsFinderImpl;

  beforeEach(() => {
    itRelatedWordsFinderImpl = new ItRelatedWordsFinderImpl();
  });

  describe('Word search', () => {
    it('finds a used it-related word in the middle of a sentence', () => {
      // arrange

      // act
      const wordsFound = itRelatedWordsFinderImpl.findAll('Этот чудный программист по С#');

      // assert
      assert.equal(wordsFound[0], 'программист', 'Used it-related word is not found');
    });

    it('finds all used it-related words', () => {
      // arrange
      // prettier-ignore
      const expectedToBeFoundWords = [
        'develop', 'developer',
        'software',
        'engineers', 'engineer', 'engineering',
        'программ', 'программы', 'программисты', 'программированием',
        'разработчик', 'разработкой',
        'специалисты', 'технологиями',
        'инженеры', 'инженеров'
      ];
      const inputText = `  ${expectedToBeFoundWords.join(' ')}  `;

      // act
      const wordsFound = itRelatedWordsFinderImpl.findAll(inputText);

      // assert
      const notFoundWord = expectedToBeFoundWords.find(w => !wordsFound.includes(w));
      if (notFoundWord) {
        assert.fail(`'${notFoundWord}' is not found in the text`);
      }
    });

    it('finds only one used it-related words', () => {
      // arrange
      // prettier-ignore
      const expectedToBeFoundWords = [
        'develop', 'developer',
        'software',
        'engineers', 'engineer', 'engineering',
        'программ', 'программы', 'программисты', 'программированием',
        'разработчик', 'разработкой',
        'специалисты', 'технологиями',
        'инженеры', 'инженеров'
      ];
      const inputText = `  ${expectedToBeFoundWords.join(' ')}  `;

      // act
      const wordFound = itRelatedWordsFinderImpl.findOne(inputText);

      // assert
      if (!expectedToBeFoundWords.includes(wordFound)) {
        assert.fail('Not fond any of used words in the text');
      }
    });

    it('does not find anything for non-it-related text using findAll', () => {
      // arrange

      // act
      const wordsFound = itRelatedWordsFinderImpl.findAll(
        'This is pretty much non-it-related text'
      );

      // assert
      // prettier-ignore
      assert.equal(wordsFound.length, 0, 'Found non-it-related words in valid text');
    });

    it('does not find anything for non-it-related text using findOne', () => {
      // arrange

      // act
      const wordFound = itRelatedWordsFinderImpl.findOne('This is pretty much non-it-related text');

      // assert
      // prettier-ignore
      assert.equal(wordFound, null, 'Found non-it-related words in valid text');
    });
  });
});
