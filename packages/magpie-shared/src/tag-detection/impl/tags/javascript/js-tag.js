/* eslint-disable class-methods-use-this */
// @flow

// app
import TextCheckableTag from '../../text-checkable-tag';
import TextChecker from '../../../text-checker';
import {ECMAScriptChecker, FrameworksChecker, NodeJsEcoChecker, ReactChecker} from './checkers';
import {RegExpChecker} from '../../checkers';
import type {TagId} from '../../../tag';

export default class JsTag extends TextCheckableTag {
  tagId: TagId = 'JavaScript';

  checkers: TextChecker[] = [
    new RegExpChecker([/js(?!on)|javascript/i]),
    new ECMAScriptChecker(),
    new FrameworksChecker(),
    new NodeJsEcoChecker(),
    new ReactChecker(),
  ];
}
