/* eslint-disable class-methods-use-this, no-unused-vars */
/* istanbul ignore file */
// @flow

export default class WhiteListedWordsFinder {
  find(text: string): string[] {
    throw new TypeError('Abstract method');
  }
}
