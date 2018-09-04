// @flow

// app
import RegExpKeywordsFinder from '../../reg-exp-keywords-finder';
import WhiteListedWordsFinder from '../white-words-finder';

export default class WhiteListedWordsFinderImpl extends WhiteListedWordsFinder {
  _regExpWordsFinder = new RegExpKeywordsFinder([
    /meet-?up\w*/gi,
    /conferenc\w*/gi,
    /\w\S*(?<!url)conf\b/i,
    /develop\w*/gi,
    /software\w*/gi,
    /engineer\w*/gi,

    /мит-?ап[а-яё]*/gi,
    /конференци[а-яё]*/gi, // IT-конференци
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
