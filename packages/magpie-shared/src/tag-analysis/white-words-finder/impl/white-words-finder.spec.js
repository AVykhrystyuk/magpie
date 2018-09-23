// @flow

// lib
import { beforeEach, describe, it } from 'mocha';
import assert from 'assert';

// app
import WhiteListedWordsFinderImpl from './white-words-finder';

describe('WhiteListedWordsFinderImpl', () => {
  let whiteListedWordsFinderImpl: WhiteListedWordsFinderImpl;

  beforeEach(() => {
    whiteListedWordsFinderImpl = new WhiteListedWordsFinderImpl();
  });

  describe('Word search', () => {
    it('finds a used white listed word in the middle of a sentence', () => {
      // arrange

      // act
      const wordsFound = whiteListedWordsFinderImpl.findAll('Этот чудный митап по С#');

      // assert
      assert.equal(wordsFound[0], 'митап', 'Used white listed word is not found');
    });

    it('finds all used white listed words', () => {
      // arrange
      // prettier-ignore
      const expectedToBeFoundWords = [
        'митап', 'митапы', 'meet-up', 'meetup', 'meet-ups',
        'конференция', 'conference', 'docker.conf',
      ];
      const inputText = `  ${expectedToBeFoundWords.join(' ')}  `;

      // act
      const wordsFound = whiteListedWordsFinderImpl.findAll(inputText);

      // assert
      const notFoundWord = expectedToBeFoundWords.find(w => !wordsFound.includes(w));
      if (notFoundWord) {
        assert.fail(`'${notFoundWord}' is not found in the text`);
      }
    });

    it('finds only one used white listed words', () => {
      // arrange
      // prettier-ignore
      const expectedToBeFoundWords = [
        'митап', 'митапы', 'meet-up', 'meetup', 'meet-ups',
        'конференция', 'conference', 'docker.conf', 'jsconf', 'ng-conf'
      ];
      const inputText = `  ${expectedToBeFoundWords.join(' ')}  `;

      // act
      const wordFound = whiteListedWordsFinderImpl.findOne(inputText);

      // assert
      if (!expectedToBeFoundWords.includes(wordFound)) {
        assert.fail('Not fond any of used words in the text');
      }
    });

    it('does not find exceptions for white listed words', () => {
      // arrange
      // prettier-ignore
      const expectedNotToBeFoundExceptions = [
        'Работа Django-сайта и urlconf.',
      ];
      const inputText = `  ${expectedNotToBeFoundExceptions.join(' ')}  `;

      // act
      const wordsFound = whiteListedWordsFinderImpl.findAll(inputText);

      // assert
      // prettier-ignore
      assert.equal(wordsFound.length, 0, `Found white listed words in valid text: ${wordsFound.map(w => `'${w}'`).join(', ')}`);
    });

    it('does not find anything for valid text using findAll', () => {
      // arrange

      // act
      const wordsFound = whiteListedWordsFinderImpl.findAll('This is pretty much valid text');

      // assert
      // prettier-ignore
      assert.equal(wordsFound.length, 0, 'Found white listed words in valid text');
    });

    it('does not find anything for valid text using findOne', () => {
      // arrange

      // act
      const wordFound = whiteListedWordsFinderImpl.findOne('This is pretty much valid text');

      // assert
      // prettier-ignore
      assert.equal(wordFound, null, 'Found white listed words in valid text');
    });
  });
});
