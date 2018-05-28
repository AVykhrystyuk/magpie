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
    it('finds a used black listed word in the middle of a sentence', () => {
      // arrange

      // act
      const wordsFound = blackListedWordsFinderImpl.find('Этот чудный курс по С#');

      // assert
      assert.equal(wordsFound[0], 'курс', 'Used black listed word is not found');
    });

    it('finds all used black listed words', () => {
      // arrange
      // prettier-ignore
      const expectedToBeFoundWords = [
        'Курс', 'курсы',
        'Тренинг', 'тренинги',
        'бизнеС', 'бизнесмен',
        'преДприниматель', 'предпринимательство',
        'трудоустройство', 'трудоустроить',
        'вакансии', 'вакансия',
        'семинар'
      ];
      const inputText = `  ${expectedToBeFoundWords.join(' ')}  `;

      // act
      const wordsFound = blackListedWordsFinderImpl.find(inputText);

      // assert
      expectedToBeFoundWords.forEach((expectedWord, index) => {
        const wordFound = wordsFound[index];
        assert.equal(wordFound, expectedWord, `'${expectedWord}' is not found in the text`);
      });
    });

    it('does not find anything for valid text', () => {
      // arrange

      // act
      const wordsFound = blackListedWordsFinderImpl.find('This is pretty much valid text');

      // assert
      // prettier-ignore
      assert.equal(wordsFound.length, 0, '[Incorrect search]: Found black listed words in valid text');
    });
  });
});
