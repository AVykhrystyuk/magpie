// @flow

import RegExpChecker from './regexp-checker';

export default class FrameworksChecker extends RegExpChecker {
  constructor() {
    // prettier-ignore
    const regExps = [
      /Angular|Ember|Vue/i
    ];

    super(regExps);
  }
}
