/* eslint-disable class-methods-use-this */
// @flow

// app
import Tag from '../../../tag';
import TextChecker from '../../../text-checker';
import {
  RegExpChecker,
  ECMAScriptChecker,
  FrameworksChecker,
  NodeJsEcoChecker,
  ReactChecker
} from './checkers';
import type {TagId} from '../../../tag';

export default class JsTag extends Tag {
  tagId: TagId = 'JavaScript';

  _checkers: TextChecker[] = [
    new RegExpChecker([/js(?!on)|javascript/i]),
    new ECMAScriptChecker(),
    new FrameworksChecker(),
    new NodeJsEcoChecker(),
    new ReactChecker(),
  ];

  isApplicableFor(text: string): boolean {
    return this._checkers.some(c => c.check(text));
  }
}
