/* istanbul ignore file */
// @flow strict

// app
import { WhiteListedWordsFinder } from './white-words-finder';
import { WhiteListedWordsFinderImpl } from './impl/white-words-finder';

export function createWhiteListedWordsFinder(): WhiteListedWordsFinder {
  return new WhiteListedWordsFinderImpl();
}
