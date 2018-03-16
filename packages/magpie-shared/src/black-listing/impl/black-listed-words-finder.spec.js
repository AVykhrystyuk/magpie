// @flow

// lib
import {beforeEach, describe, it} from 'mocha';
import assert from 'assert';

// app
import BlackListedWordsFinderImpl from './black-listed-words-finder';

describe('BlackListedWordsFinderImpl', () => {
  let blackListedWordsFinderImpl: BlackListedWordsFinderImpl;

  beforeEach(() => {
    blackListedWordsFinderImpl = new BlackListedWordsFinderImpl();
  });

  describe('Word search', () => {
    it('finds used black list word', () => {
      // arrange

      // act
      const wordsFound = blackListedWordsFinderImpl.find('Курс по С#');

      // assert
      assert.equal(wordsFound[0], 'Курс', 'Used black list word is not found');
    });

    it('finds all used black list words', () => {
      // arrange
      // prettier-ignore
      const blackListedWords = [
        'Курс',
        'Тренинг',
        'бизнеС',
        'предпринимательство'
      ];
      const inputText = blackListedWords.join(' ');

      // act
      const wordsFound = blackListedWordsFinderImpl.find(inputText);

      // assert
      wordsFound.forEach((wordFound, index) => {
        const expectedWord = blackListedWords[index];
        assert.equal(wordFound, expectedWord, 'Used black list word is not found');
      });
    });

    it('does not find anything for valid text', () => {
      // arrange

      // act
      const wordsFound = blackListedWordsFinderImpl.find('This is pretty much valid text');

      // assert
      // prettier-ignore
      assert.equal(wordsFound.length, 0, '[Incorrect search]: Found black list words in valid text');
    });
  });
});
