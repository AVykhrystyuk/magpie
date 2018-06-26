// @flow

// app
import RegExpKeywordsFinder from '../../reg-exp-keywords-finder';
import BlackListedWordsFinder from '../black-words-finder';

export default class BlackListedWordsFinderImpl extends BlackListedWordsFinder {
  _regExpWordsFinder = new RegExpKeywordsFinder([
    /курс[а-яё]*/gi,
    /тренинг[а-яё]*/gi,
    /бизнес[а-яё]*(?![\s-]логика)/gi,
    /предприниматель[а-яё]*/gi, // предприниматель(ство)?
    /трудоустро[а-яё]+/gi, // трудоустро(йство|ить)?
    /ваканси[ия]/gi, // вакансии, вакансия
    /семинары?/gi,
  ]);

  findAll(text: string): string[] {
    return this._regExpWordsFinder.findAll(text);
  }

  findOne(text: string): ?string {
    return this._regExpWordsFinder.findOne(text);
  }
}
