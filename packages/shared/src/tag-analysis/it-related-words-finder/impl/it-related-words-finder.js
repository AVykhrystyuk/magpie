// @flow strict

// app
import RegExpKeywordsFinder from '../../reg-exp-keywords-finder';
import ItRelatedWordsFinder from '../it-related-words-finder';

export default class ItRelatedWordsFinderImpl extends ItRelatedWordsFinder {
  _regExpWordsFinder = new RegExpKeywordsFinder([
    /develop\w*/gi,
    /software\w*/gi,
    /engineer\w*/gi,

    /программ(?:|ист|ировани)[а-яё]*/gi, // программы, программист, программирование
    /разработ(?:к|чик)[а-яё]*/gi,
    /инженер[а-яё]*/gi,
    /специалист[а-яё]*/gi,
    /технологи[а-яё]*/gi,
  ]);

  findAll(text: string): string[] {
    return this._regExpWordsFinder.findAll(text);
  }

  findOne(text: string): ?string {
    return this._regExpWordsFinder.findOne(text);
  }
}
