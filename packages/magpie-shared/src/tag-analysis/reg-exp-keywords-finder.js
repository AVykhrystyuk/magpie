// @flow strict

export default class RegExpKeywordsFinder {
  _regExps: RegExp[];

  constructor(keywordRegExps: RegExp[]) {
    this._regExps = keywordRegExps;
  }

  findAll(text: string): string[] {
    const foundWords = [];

    for (const regExp of this._regExps) {
      if (regExp.global) {
        const matches = RegExpKeywordsFinder._findGlobalMatches(text, regExp);
        foundWords.push(...matches);
      } else {
        const match = regExp.exec(text);
        if (match != null) {
          foundWords.push(match[0]);
        }
      }
    }

    return foundWords;
  }

  findOne(text: string): ?string {
    for (const regExp of this._regExps) {
      const match = regExp.exec(text);
      if (match != null) {
        return match[0].trim();
      }
    }

    return null;
  }

  static _findGlobalMatches(text: string, regExp: RegExp): string[] {
    const matches = [];

    for (;;) {
      const match = regExp.exec(text);
      if (match != null) {
        matches.push(match[0].trim());
      } else {
        break;
      }
    }

    return matches;
  }
}
