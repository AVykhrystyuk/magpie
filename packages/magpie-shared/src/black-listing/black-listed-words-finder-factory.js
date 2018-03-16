/* eslint-disable class-methods-use-this, no-unused-vars */
/* istanbul ignore file */
// @flow

// app
import BlackListWordsFinder from './black-listed-words-finder';

export default class BlackListWordsFinderFactory {
  create(): BlackListWordsFinder {
    throw new TypeError('Abstract method');
  }
}
