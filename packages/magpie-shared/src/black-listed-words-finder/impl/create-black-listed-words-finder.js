/* istanbul ignore file */
// @flow

// app
import BlackListedWordsFinder from '../black-listed-words-finder';
import BlackListedWordsFinderImpl from './black-listed-words-finder';

export default function createBlackListedWordsFinder(): BlackListedWordsFinder {
  return new BlackListedWordsFinderImpl();
}
