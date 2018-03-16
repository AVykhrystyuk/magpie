// @flow

import RegExpChecker from './regexp-checker';

export default class ECMAScriptChecker extends RegExpChecker {
  constructor() {
    // prettier-ignore
    const regExps = [
      /\bES(-?\d{1,4}|\.?next)\b/i,
      /ECMAScript/i
    ];
    super(regExps);
  }
}