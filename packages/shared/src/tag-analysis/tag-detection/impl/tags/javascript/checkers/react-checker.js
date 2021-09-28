/* eslint-disable class-methods-use-this */
// @flow strict

import { TextChecker } from '../../../../text-checker';

export class ReactChecker extends TextChecker {
  check(text: string): boolean {
    if (/\breact\b/i.test(text) && ReactChecker._hasHelperWords(text)) {
      return true;
    }

    if (/\breact\s+native\b/i.test(text)) {
      return true;
    }

    return ReactChecker._hasPossibleTitle(text);
  }

  static _hasHelperWords(text: string): boolean {
    if (/\b(?:meet-?ups?|conf|conferenc\w*)\b/i.test(text)) {
      return true;
    }

    if (
      /\b(?:dom|render|components?|web|ui|interfaces?|users?|front-?end(?:er|ers)?)\b/i.test(text)
    ) {
      return true;
    }

    return /\b(?:devs?|develop(?:ing|ments?|ers?)?)\b/i.test(text);
  }

  static _hasPossibleTitle(text: string): boolean {
    return /\bReact\s+[A-Z]+\w+/.test(text);
  }
}
