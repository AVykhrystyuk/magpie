// @flow

import {RegExpChecker} from '../../../checkers';

export default class ECMAScriptChecker extends RegExpChecker {
  // prettier-ignore
  regExps: RegExp[] = [
    /\bES(?:-?\d{1,4}|\.?next)\b/i,
    /ECMAScript/i
  ];
}
