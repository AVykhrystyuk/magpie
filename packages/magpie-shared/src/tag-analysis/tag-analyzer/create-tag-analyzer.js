/* istanbul ignore file */
// @flow

// app
import TagAnalyzer from './tag-analyzer';
import TagAnalyzerImpl from './impl/tag-analyzer';
import createTagDetector from '../tag-detection/create-tag-detector';
import createWhiteListedWordsFinder from '../white-words-finder/create-white-words-finder';
import createBlackListedWordsFinder from '../black-words-finder/create-black-words-finder';
import createItRelatedWordsFinder from '../it-related-words-finder/create-it-related-words-finder';

export default function createTagAnalyzer(): TagAnalyzer {
  return new TagAnalyzerImpl(
    createTagDetector(),
    createBlackListedWordsFinder(),
    createWhiteListedWordsFinder(),
    createItRelatedWordsFinder()
  );
}
