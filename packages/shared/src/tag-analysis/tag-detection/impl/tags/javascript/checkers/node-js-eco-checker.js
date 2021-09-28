// @flow strict

import { TextChecker } from '../../../../text-checker';

export class NodeJsEcoChecker extends TextChecker {
  // prettier-ignore
  commonRegExps: RegExp[] = [
    /\b(?:npm|grunt|gulp|webpack)\b/i
  ];

  check(text: string): boolean {
    const hasSome = this.commonRegExps.some(e => e.test(text));
    if (hasSome) {
      return true;
    }

    return NodeJsEcoChecker.hasYarnWord(text);
  }

  static hasYarnWord(text: string): boolean {
    if (/\byarn\b/i.test(text)) {
      return !NodeJsEcoChecker.hasHadoop(text);
    }

    return false;
  }

  static hasHadoop(text: string): boolean {
    return /\bHadoop\b/i.test(text); // Apache Hadoop
  }
}
