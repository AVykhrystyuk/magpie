/* eslint-disable class-methods-use-this */
// @flow

export default class RegExpKeywordsFinder {
  _regExps: RegExp[];

  constructor(keywordRegExps: RegExp[]) {
    this._regExps = keywordRegExps;
  }

  findAll(text: string): string[] {
    const foundWords = [];

    for (const regExp of this._regExps) {
      if (regExp.global) {
        const matches = this._findGlobalMatches(text, regExp);
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

  _findGlobalMatches(text: string, regExp: RegExp): string[] {
    const matches = [];

    let match;
    // eslint-disable-next-line no-cond-assign
    while ((match = regExp.exec(text)) != null) {
      matches.push(match[0].trim());
    }

    return matches;
  }
}
