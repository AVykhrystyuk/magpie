// @flow

import TagAnalyzer from '../tag-analyzer';
import type { TagAnalysisResult } from '../tag-analyzer';
import { TagDetector } from '../../tag-detection';
import { BlackListedWordsFinder } from '../../black-words-finder';
import { WhiteListedWordsFinder } from '../../white-words-finder';
import { isWhitespaceOrEmpty } from '../../../utils';

export default class TagAnalyzerImpl extends TagAnalyzer {
  _tagDetector: TagDetector;
  _blackListedWordsFinder: BlackListedWordsFinder;
  _whiteListedWordsFinder: WhiteListedWordsFinder;

  constructor(
    tagDetector: TagDetector,
    blackListedWordsFinder: BlackListedWordsFinder,
    whiteListedWordsFinder: WhiteListedWordsFinder
  ) {
    super();

    this._tagDetector = tagDetector;
    this._blackListedWordsFinder = blackListedWordsFinder;
    this._whiteListedWordsFinder = whiteListedWordsFinder;
  }

  analize(text: string): TagAnalysisResult {
    const empty = isWhitespaceOrEmpty(text);
    if (empty) {
      return {
        whiteWords: [],
        blackWords: [],
        tagIds: [],
        valid: false,
      };
    }

    const whiteWords = this._whiteListedWordsFinder.findAll(text);
    const blackWords = this._blackListedWordsFinder.findAll(text);
    const tagIds = this._tagDetector.detectAll(text);

    const valid = this._validate(whiteWords, blackWords, tagIds);

    return {
      whiteWords: whiteWords,
      blackWords: blackWords,
      tagIds: tagIds,
      valid: valid,
    };
  }

  _validate(whiteWords: string[], blackWords: string[], tagIds: string[]): boolean {
    if (tagIds.length <= 0) {
      return false;
    }

    if (whiteWords.length > 0) {
      return true;
    }

    return blackWords.length === 0;
  }
}
