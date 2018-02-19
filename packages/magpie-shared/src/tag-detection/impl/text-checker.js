/* eslint-disable class-methods-use-this, no-unused-vars */
/* istanbul ignore file */
// @flow

export default class TextChecker {
  check(text: string): boolean {
    throw new TypeError('Abstract method');
  }
}
