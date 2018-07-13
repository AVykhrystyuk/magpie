// @flow

import {RegExpChecker} from '../../../checkers';

export default class FrameworksChecker extends RegExpChecker {
  // prettier-ignore
  regExps: RegExp[] = [
    /Angular|(?<!\bm)Ember|Vue/i
  ];
}
