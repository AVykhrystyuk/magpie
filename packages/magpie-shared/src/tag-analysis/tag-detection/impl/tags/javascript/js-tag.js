// @flow strict

// app
import TextCheckableTag from '../../text-checkable-tag';
import TextChecker from '../../../text-checker';
import {
  ECMAScriptChecker,
  FrameworksChecker,
  NodeJsEcoChecker,
  ReactChecker,
} from './checkers/index';
import { RegExpChecker } from '../../checkers/index';
import type { TagId } from '../../../tag';

export default class JsTag extends TextCheckableTag {
  tagId: TagId = 'JavaScript';

  checkers: TextChecker[] = [
    new RegExpChecker([/js(?!on)|javascript/i]),
    new ECMAScriptChecker(),
    new FrameworksChecker(),
    new NodeJsEcoChecker(),
    new ReactChecker(),
  ];

  guardRegexps: RegExp[] = [/\bscript.*?text\/javascript\b/];

  isApplicableFor(text: string): boolean {
    const found = this.guardRegexps.some(regexp => regexp.test(text));
    if (found) {
      return false;
    }

    return super.isApplicableFor(text);
  }
}
