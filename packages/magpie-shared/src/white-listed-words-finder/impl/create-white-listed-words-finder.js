/* istanbul ignore file */
// @flow

// app
import WhiteListedWordsFinder from '../white-listed-words-finder';
import WhiteListedWordsFinderImpl from './white-listed-words-finder';

export default function createWhiteListedWordsFinder(): WhiteListedWordsFinder {
  return new WhiteListedWordsFinderImpl();
}
