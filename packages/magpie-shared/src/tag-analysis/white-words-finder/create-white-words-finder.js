/* istanbul ignore file */
// @flow

// app
import WhiteListedWordsFinder from './white-words-finder';
import WhiteListedWordsFinderImpl from './impl/white-words-finder';

export default function createWhiteListedWordsFinder(): WhiteListedWordsFinder {
  return new WhiteListedWordsFinderImpl();
}
