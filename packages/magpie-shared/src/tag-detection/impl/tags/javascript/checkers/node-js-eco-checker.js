// @flow

import {RegExpChecker} from '../../../checkers';

export default class NodeJsEcoChecker extends RegExpChecker {
  // prettier-ignore
  regExps: RegExp[] = [
    /\b(?:npm|yarn|grunt|gulp|webpack)\b/i
  ];
}
