/* eslint-disable class-methods-use-this */
// @flow

// app
import BlackListedWordsFinder from '../black-listed-words-finder';

export default class BlackListedWordsFinderImpl extends BlackListedWordsFinder {
  _regExps: RegExp[] = [
    /курс/i,
    /тренинг/i,
    /бизнес/i,
    /предприниматель/i, // предприниматель(ство)?
  ];

  find(text: string): string[] {
    const foundWords = [];

    for (const regExp of this._regExps) {
      const match = regExp.exec(text);
      if (match !== null) {
        foundWords.push(match[0]);
      }
    }

    return foundWords;
  }
}
