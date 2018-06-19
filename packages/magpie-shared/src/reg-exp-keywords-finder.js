/* eslint-disable class-methods-use-this */
// @flow

export default class RegExpKeywordsFinder {
  _regExps: RegExp[];

  constructor(keywordRegExps: RegExp[]) {
    this._regExps = keywordRegExps;
  }

  find(text: string): string[] {
    const foundWords = [];

    for (const regExp of this._regExps) {
      const matches = this._findAllMatches(text, regExp);
      foundWords.push(...matches);
    }

    return foundWords;
  }

  _findAllMatches(text: string, regExp: RegExp): string[] {
    const matches = [];

    let match;
    // eslint-disable-next-line no-cond-assign
    while ((match = regExp.exec(text)) != null) {
      matches.push(match[0]);
    }

    return matches;
  }
}
