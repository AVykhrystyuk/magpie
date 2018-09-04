// @flow

import { RegExpChecker } from '../../../checkers/index';

export default class FrameworksChecker extends RegExpChecker {
  // prettier-ignore
  regExps: RegExp[] = [
    /Angular|(?<!\bm)Ember|Vue/i
  ];
}
