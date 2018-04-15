/* eslint-disable class-methods-use-this, no-unused-vars */
/* istanbul ignore file */
// @flow

// app
import BlackListWordsFinder from '../black-listed-words-finder';
import BlackListWordsFinderImpl from './black-listed-words-finder';

export default function createBlackListWordsFinder(): BlackListWordsFinder {
  return new BlackListWordsFinderImpl();
}
