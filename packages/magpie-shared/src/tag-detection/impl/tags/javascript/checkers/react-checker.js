/* eslint-disable class-methods-use-this */
// @flow

import TextChecker from '../../../../text-checker';

export default class ReactChecker extends TextChecker {
  check(text: string): boolean {
    if (/\breact\b/i.test(text) && ReactChecker.hasHelperWords(text)) {
      return true;
    }

    if (/\breact\s+native\b/i.test(text)) {
      return true;
    }

    return ReactChecker.hasPossibleTitle(text);
  }

  static hasHelperWords(text: string): boolean {
    if (/\b(meet-?up|conf|dom|render|web|ui|interface|user|front-?end)\b/i.test(text)) {
      return true;
    }

    return /\b(dev|develop(ing|ment)?)\b/i.test(text);
  }

  static hasPossibleTitle(text: string): boolean {
    return /\bReact\s+[A-Z]+\w+/.test(text);
  }
}
