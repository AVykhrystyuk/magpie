// @flow strict

import { RegExpChecker } from '../../../checkers/index';

export default class ECMAScriptChecker extends RegExpChecker {
  constructor() {
    // prettier-ignore
    super([
      /\bES(?:-?\d{1,4}|\.?next)\b/i,
      /ECMAScript/i
    ]);
  }
}
