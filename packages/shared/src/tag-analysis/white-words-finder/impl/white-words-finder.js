// @flow strict

// app
import { RegExpKeywordsFinder } from '../../reg-exp-keywords-finder';
import { WhiteListedWordsFinder } from '../white-words-finder';

export class WhiteListedWordsFinderImpl extends WhiteListedWordsFinder {
  _regExpWordsFinder: RegExpKeywordsFinder = new RegExpKeywordsFinder([
    /meet-?up\w*/gi,
    /conferenc\w*/gi,
    /\w\S*(?<!url)conf\b/i,

    /мит-?ап[а-яё]*/gi,
    /конференци[а-яё]*/gi, // IT-конференци
  ]);

  findAll(text: string): string[] {
    return this._regExpWordsFinder.findAll(text);
  }

  findOne(text: string): ?string {
    return this._regExpWordsFinder.findOne(text);
  }
}
