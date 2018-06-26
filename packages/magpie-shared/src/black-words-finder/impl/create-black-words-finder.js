/* istanbul ignore file */
// @flow

// app
import BlackListedWordsFinder from '../black-words-finder';
import BlackListedWordsFinderImpl from './black-words-finder';

export default function createBlackListedWordsFinder(): BlackListedWordsFinder {
  return new BlackListedWordsFinderImpl();
}
