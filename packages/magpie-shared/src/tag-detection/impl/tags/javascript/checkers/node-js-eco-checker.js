// @flow

import RegExpChecker from './regexp-checker';

export default class NodeJsEcoChecker extends RegExpChecker {
  constructor() {
    // prettier-ignore
    const regExps = [
      /\b(npm|yarn|grunt|gulp|webpack)\b/i
    ];

    super(regExps);
  }
}
