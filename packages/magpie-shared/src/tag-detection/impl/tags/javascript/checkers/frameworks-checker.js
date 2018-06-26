// @flow

import RegExpChecker from './reg-exp-checker';

export default class FrameworksChecker extends RegExpChecker {
  constructor() {
    // prettier-ignore
    const regExps = [
      /Angular|(?<!\bm)Ember|Vue/i
    ];

    super(regExps);
  }
}
