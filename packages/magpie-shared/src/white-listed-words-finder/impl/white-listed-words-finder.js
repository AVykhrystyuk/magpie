// @flow

// app
import RegExpKeywordsFinder from '../../reg-exp-keywords-finder';
import WhiteListedWordsFinder from '../white-listed-words-finder';

export default class WhiteListedWordsFinderImpl extends WhiteListedWordsFinder {
  _regExpWordsFinder = new RegExpKeywordsFinder([
    /meet-?up\S*/gi,
    /мит-?ап\S*/gi,
    /conferenc\S*/gi,
    /\S*conf\b/i,
    /конференци\S*/gi,
  ]);

  findAll(text: string): string[] {
    return this._regExpWordsFinder.findAll(text);
  }

  findOne(text: string): ?string {
    return this._regExpWordsFinder.findOne(text);
  }
}
