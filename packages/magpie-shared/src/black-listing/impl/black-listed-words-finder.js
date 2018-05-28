/* eslint-disable class-methods-use-this */
// @flow

// app
import BlackListedWordsFinder from '../black-listed-words-finder';

export default class BlackListedWordsFinderImpl extends BlackListedWordsFinder {
  _regExps: RegExp[] = [
    /курс[а-яё]*/gi,
    /тренинг[а-яё]*/gi,
    /бизнес[а-яё]*/gi,
    /предприниматель[а-яё]*/gi, // предприниматель(ство)?
    /трудоустро[а-яё]+/gi, // трудоустро(йство|ить)?
    /ваканси(и|я)/gi, // вакансии, вакансия
    /семинары?/gi,
  ];

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

    let loop = true;
    do {
      const match = regExp.exec(text);
      if (match != null) {
        matches.push(match[0]);
      } else {
        loop = false;
      }
    } while (loop);

    return matches;
  }
}
