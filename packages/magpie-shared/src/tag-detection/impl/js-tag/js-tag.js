/* eslint-disable class-methods-use-this */
// @flow

// app
import Tag from '../../tag';
import TextChecker from '../text-checker';
import {ECMAScriptChecker, FrameworksChecker} from './checkers';
import type {TagId} from '../../tag';

export default class JsTag extends Tag {
  tagId: TagId;
  _keyWordsRegExp: RegExp;
  _checkers: TextChecker[];

  constructor() {
    super();

    // prettier-ignore
    this._checkers = [
      new ECMAScriptChecker(),
      new FrameworksChecker()
    ];

    this.tagId = 'JavaScript';
    this._keyWordsRegExp = /js(?!on)|javascript/i;
  }

  isApplicableFor(text: string): boolean {
    if (this._keyWordsRegExp.test(text)) {
      return true;
    }

    return this._checkers.some(c => c.check(text));
  }
}
