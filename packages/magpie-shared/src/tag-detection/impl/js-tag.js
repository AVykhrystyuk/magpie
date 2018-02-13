/* eslint-disable class-methods-use-this */
// @flow

// app
import Tag from '../tag';
import type {TagId} from '../tag';

export default class JsTag extends Tag {
  tagId: TagId;
  keyWordsRegExp: RegExp;

  constructor() {
    super();

    this.tagId = 'JavaScript';
    this.keyWordsRegExp = /js(?!on)|javascript|ECMAScript/i;
  }

  isApplicableFor(text: string): boolean {
    if (this.keyWordsRegExp.test(text)) {
      return true;
    }

    return false;
  }
}
