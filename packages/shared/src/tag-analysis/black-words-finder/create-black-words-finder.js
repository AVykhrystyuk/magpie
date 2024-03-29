/* istanbul ignore file */
// @flow strict

// app
import { BlackListedWordsFinder } from './black-words-finder';
import { BlackListedWordsFinderImpl } from './impl/black-words-finder';

export function createBlackListedWordsFinder(): BlackListedWordsFinder {
  return new BlackListedWordsFinderImpl();
}
