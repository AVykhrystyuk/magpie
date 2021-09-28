// @flow strict

import { TextChecker } from '../../text-checker';

export class RegExpChecker extends TextChecker {
  _regExps: RegExp[];

  constructor(regExps: RegExp[]) {
    super();

    this._regExps = regExps;
  }

  check(text: string): boolean {
    return this._regExps.some(e => e.test(text));
  }
}
