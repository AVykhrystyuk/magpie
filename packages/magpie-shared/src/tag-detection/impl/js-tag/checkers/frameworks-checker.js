// @flow

import TextChecker from '../../text-checker';

export default class FrameworksChecker extends TextChecker {
  _regExps: RegExp[];

  constructor() {
    super();

    // prettier-ignore
    this._regExps = [
      /Angular|Ember|Vue/i
    ];
  }

  check(text: string): boolean {
    return this._regExps.some(e => e.test(text));
  }
}
