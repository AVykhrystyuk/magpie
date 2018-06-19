// @flow

// app
import RegExpKeywordsFinder from '../../reg-exp-keywords-finder';
import WhiteListedWordsFinder from '../white-listed-words-finder';

export default class WhiteListedWordsFinderImpl extends WhiteListedWordsFinder {
  _regExpWordsFinder = new RegExpKeywordsFinder([
    /meet-?up/gi,
    /митап/gi,
    /conference/gi,
    /\S*conf\b/gi,
    /конференция/gi,
  ]);

  find(text: string): string[] {
    return this._regExpWordsFinder.find(text);
  }
}
