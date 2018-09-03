// @flow

// app
import RegExpKeywordsFinder from '../../reg-exp-keywords-finder';
import BlackListedWordsFinder from '../black-words-finder';

export default class BlackListedWordsFinderImpl extends BlackListedWordsFinder {
  _regExpWordsFinder = new RegExpKeywordsFinder([
    /(?:^|\s|[,.;!?])курс[а-яё]*/gi, // курс, но не конкурс
    /тренинг[а-яё]*/gi,
    /бизнес[а-яё]*(?![\s-](логик[а-яё]*|центр[а-яё]*))/gi,
    /предприниматель[а-яё]*/gi, // предприниматель(ство)?
    /трудоустро[а-яё]+/gi, // трудоустро(йство|ить)?
    /ваканси[а-яё]*/gi, // вакансии, вакансия, вакансий
    /семинар[а-яё]*/gi,
    /мастер-класс[а-яё]*/gi, // мастер-классов, мастер-классы
    /заняти[а-яё]*/gi,
    /интенсив[а-яё]*/gi, // интенсив, интенсивы, интенсивный
    /воркшоп[а-яё]*/gi, // воркшоп, воркшопы
    /вебинар[а-яё]*/gi,
    /маркет(?:инг|олог)[а-яё]*/gi,
    /прода(?:ж|ть|вать|ю)[а-яё]*/gi,
  ]);

  findAll(text: string): string[] {
    return this._regExpWordsFinder.findAll(text);
  }

  findOne(text: string): ?string {
    return this._regExpWordsFinder.findOne(text);
  }
}
