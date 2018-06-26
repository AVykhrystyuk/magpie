/* eslint-disable class-methods-use-this, no-unused-vars */
/* istanbul ignore file */
// @flow

export default class BlackListedWordsFinder {
  findAll(text: string): string[] {
    throw new TypeError('Abstract method');
  }
  findOne(text: string): ?string {
    throw new TypeError('Abstract method');
  }
}
