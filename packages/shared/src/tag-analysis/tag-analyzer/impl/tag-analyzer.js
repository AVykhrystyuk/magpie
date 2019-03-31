// @flow strict

import TagAnalyzer from '../tag-analyzer';
import type { TagAnalysisResult } from '../tag-analyzer';
import { TagDetector } from '../../tag-detection';
import { BlackListedWordsFinder } from '../../black-words-finder';
import { WhiteListedWordsFinder } from '../../white-words-finder';
import { ItRelatedWordsFinder } from '../../it-related-words-finder';
import { isWhitespaceOrEmpty } from '../../../utils';

export default class TagAnalyzerImpl extends TagAnalyzer {
  _tagDetector: TagDetector;
  _blackListedWordsFinder: BlackListedWordsFinder;
  _whiteListedWordsFinder: WhiteListedWordsFinder;
  _itRelatedWordsFinder: ItRelatedWordsFinder;

  constructor(
    tagDetector: TagDetector,
    blackListedWordsFinder: BlackListedWordsFinder,
    whiteListedWordsFinder: WhiteListedWordsFinder,
    itRelatedWordsFinder: ItRelatedWordsFinder
  ) {
    super();

    this._tagDetector = tagDetector;
    this._blackListedWordsFinder = blackListedWordsFinder;
    this._whiteListedWordsFinder = whiteListedWordsFinder;
    this._itRelatedWordsFinder = itRelatedWordsFinder;
  }

  analyze(text: string): TagAnalysisResult {
    const empty = isWhitespaceOrEmpty(text);
    if (empty) {
      return {
        whiteWords: [],
        blackWords: [],
        tagIds: [],
        valid: false,
        itRelatedWords: [],
      };
    }

    const whiteWords = this._whiteListedWordsFinder.findAll(text);
    const blackWords = this._blackListedWordsFinder.findAll(text);
    const tagIds = this._tagDetector.detectAll(text);
    const itRelatedWords = this._itRelatedWordsFinder.findAll(text);

    const valid = TagAnalyzerImpl._validate(whiteWords, blackWords, tagIds);

    return {
      whiteWords,
      blackWords,
      tagIds,
      valid,
      itRelatedWords,
    };
  }

  static _validate(whiteWords: string[], blackWords: string[], tagIds: string[]): boolean {
    if (tagIds.length <= 0) {
      return false;
    }

    if (whiteWords.length > 0) {
      /*
      if (whiteWords.length >= blackWords.length / 2) {
        return true;
      }
      */

      if (whiteWords.length >= blackWords.length) {
        return true;
      }
    }

    return blackWords.length === 0;
  }
}
