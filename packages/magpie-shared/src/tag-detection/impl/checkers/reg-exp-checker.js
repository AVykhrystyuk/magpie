// @flow

import TextChecker from '../../text-checker';

export default class RegExpChecker extends TextChecker {
  regExps: RegExp[];

  constructor(regExps: RegExp[]) {
    super();

    this.regExps = regExps;
  }

  check(text: string): boolean {
    return this.regExps.some(e => e.test(text));
  }
}
