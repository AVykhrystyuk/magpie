/* eslint-disable class-methods-use-this, no-unused-vars */
/* istanbul ignore file */
// @flow

export type TagId = string;

export default class Tag {
  +tagId: TagId;

  isApplicableFor(text: string): boolean {
    throw new TypeError('Abstract method');
  }
}
