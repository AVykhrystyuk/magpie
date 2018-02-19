// @flow

import TextChecker from '../../text-checker';

export default class ECMAScriptCheck extends TextChecker {
  _regExps: RegExp[];

  constructor() {
    super();

    // prettier-ignore
    this._regExps = [
      /\bES(-?\d{1,4}|\.?next)\b/i,
      /ECMAScript/i
    ];
  }

  check(text: string): boolean {
    return this._regExps.some(e => e.test(text));
  }
}
