// @flow strict

import { RegExpChecker } from '../../../checkers/index';

export class FrameworksChecker extends RegExpChecker {
  constructor() {
    // prettier-ignore
    super([
      /Angular|(?<!\bm)Ember|Vue/i
    ]);
  }
}
