// @flow strict

import { RegExpChecker } from '../../../checkers/index';

export default class FrameworksChecker extends RegExpChecker {
  constructor() {
    // prettier-ignore
    super([
      /Angular|(?<!\bm)Ember|Vue/i
    ]);
  }
}
