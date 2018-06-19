// lib
import {beforeEach, describe, it} from 'mocha';
import assert from 'assert';

// app
import WhiteListedWordsFinderImpl from './white-listed-words-finder';

describe('WhiteListedWordsFinderImpl', () => {
  let whiteListedWordsFinderImpl;

  beforeEach(() => {
    whiteListedWordsFinderImpl = new WhiteListedWordsFinderImpl();
  });

  describe('Word search', () => {
    it('finds a used white listed word in the middle of a sentence', () => {
      // arrange

      // act
      const wordsFound = whiteListedWordsFinderImpl.find('Этот чудный митап по С#');

      // assert
      assert.equal(wordsFound[0], 'митап', 'Used white listed word is not found');
    });

    it('finds all used white listed words', () => {
      // arrange
      // prettier-ignore
      const expectedToBeFoundWords = [
        'митап', 'meet-up', 'meetup',
        'конференция', 'conference', 'docker.conf'
      ];
      const inputText = `  ${expectedToBeFoundWords.join(' ')}  `;

      // act
      const wordsFound = whiteListedWordsFinderImpl.find(inputText);

      // assert
      const notFoundWord = expectedToBeFoundWords.find(w => !wordsFound.includes(w));
      if (notFoundWord) {
        assert.fail(`'${notFoundWord}' is not found in the text`);
      }
    });

    it('does not find anything for valid text', () => {
      // arrange

      // act
      const wordsFound = whiteListedWordsFinderImpl.find('This is pretty much valid text');

      // assert
      // prettier-ignore
      assert.equal(wordsFound.length, 0, '[Incorrect search]: Found white listed words in valid text');
    });
  });
});
