// @flow

// app
import RegExpKeywordsFinder from '../../reg-exp-keywords-finder';
import BlackListedWordsFinder from '../black-words-finder';

export default class BlackListedWordsFinderImpl extends BlackListedWordsFinder {
  _regExpWordsFinder = new RegExpKeywordsFinder([
    /(?:^|\s|[,.;!?])курс[а-яё]*/gi,
    /тренинг[а-яё]*/gi,
    /бизнес[а-яё]*(?![\s-](логик[а-яё]*|центр[а-яё]*))/gi,
    /предприниматель[а-яё]*/gi, // предприниматель(ство)?
    /трудоустро[а-яё]+/gi, // трудоустро(йство|ить)?
    /ваканси[а-яё]*/gi, // вакансии, вакансия, вакансий
    /семинар[а-яё]*/gi,
    /мастер-класс[а-яё]*/gi, // мастер-классов, мастер-классы
    /интенсив[а-яё]*/gi, //интенсив, интенсивы
    /воркшоп[а-яё]*/gi, //воркшоп, воркшопы
  ]);

  findAll(text: string): string[] {
    return this._regExpWordsFinder.findAll(text);
  }

  findOne(text: string): ?string {
    return this._regExpWordsFinder.findOne(text);
  }
}
