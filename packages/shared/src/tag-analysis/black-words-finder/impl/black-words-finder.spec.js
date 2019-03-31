// @flow strict

// lib
import { beforeEach, describe, it } from 'mocha';
import assert from 'assert';

// app
import BlackListedWordsFinderImpl from './black-words-finder';

describe('BlackListedWordsFinderImpl', () => {
  let blackListedWordsFinderImpl: BlackListedWordsFinderImpl;

  beforeEach(() => {
    blackListedWordsFinderImpl = new BlackListedWordsFinderImpl();
  });

  describe('Word search', () => {
    it('finds a used black listed word ("курс") in the middle of a sentence', () => {
      // arrange

      // act
      const wordsFound = blackListedWordsFinderImpl.findAll('Этот чудный курс по С#');

      // assert
      assert.equal(wordsFound[0], 'курс', 'Used black listed word is not found');
    });

    it('finds a used black listed word ("маркетолог") in the middle of a sentence', () => {
      // arrange

      // act
      const wordsFound = blackListedWordsFinderImpl.findAll(
        'Этот чудный интернет-маркетолог все испортил'
      );

      // assert
      assert.equal(wordsFound[0], 'маркетолог', 'Used black listed word is not found');
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
        'семинар',
        'мастер-класс', 'мастер-классы',
        'занятие', 'занятия', 'занятий',
        'вебинар', 'вебинары', 'вебинаров',
        'интенсив',
        'воркшоп',
        'маркетинг',
        'маркетолог',
        'продаж', 'продажи', 'продаю', 'продать', 'продавать',
      ];
      const inputText = `  ${expectedToBeFoundWords.join(' ')}  `;

      // act
      const wordsFound = blackListedWordsFinderImpl.findAll(inputText);

      // assert
      const notFoundWord = expectedToBeFoundWords.find(w => !wordsFound.includes(w));
      if (notFoundWord) {
        assert.fail(`'${notFoundWord}' is not found in the text`);
      }
    });

    it('finds only one used black listed words', () => {
      // arrange
      // prettier-ignore
      const expectedToBeFoundWords = [
        'Курс', 'курсы',
        'Тренинг', 'тренинги',
        'бизнеС', 'бизнесмен',
        'преДприниматель', 'предпринимательство',
        'трудоустройство', 'трудоустроить',
        'вакансии', 'вакансия',
        'семинар',
        'мастер-класс', 'мастер-классы',
        'интенсив',
        'воркшоп'
      ];
      const inputText = `  ${expectedToBeFoundWords.join(' ')}  `;

      // act
      const wordFound = blackListedWordsFinderImpl.findOne(inputText);

      // assert
      if (!expectedToBeFoundWords.includes(wordFound)) {
        assert.fail('Not fond any of used words in the text');
      }
    });

    it('does not find exceptions for black listed words', () => {
      // arrange
      // prettier-ignore
      const expectedNotToBeFoundExceptions = [
        'текст бизнеС Логика текст',
        'текст бизнес-логика текст',
        'посетить небольшую экскурсию по офису',
        'поесть на территории бизнес-центра и ',
        'проведем конкурс сразу после'
      ];
      const inputText = `  ${expectedNotToBeFoundExceptions.join(' ')}  `;

      // act
      const wordsFound = blackListedWordsFinderImpl.findAll(inputText);

      // assert
      // prettier-ignore
      assert.equal(wordsFound.length, 0, `Found black listed words in valid text: ${wordsFound.map(w => `'${w}'`).join(', ')}`);
    });

    it('does not find anything for valid text using findAll', () => {
      // arrange

      // act
      const wordsFound = blackListedWordsFinderImpl.findAll('This is pretty much valid text');

      // assert
      // prettier-ignore
      assert.equal(wordsFound.length, 0, 'Found black listed words in valid text');
    });

    it('does not find anything for valid text using findOne', () => {
      // arrange

      // act
      const wordFound = blackListedWordsFinderImpl.findOne('This is pretty much valid text');

      // assert
      // prettier-ignore
      assert.equal(wordFound, null, 'Found black listed words in valid text');
    });
  });
});
