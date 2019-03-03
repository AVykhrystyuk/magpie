/* istanbul ignore file */
// @flow strict

// app
import ItRelatedWordsFinder from './it-related-words-finder';
import ItRelatedWordsFinderImpl from './impl/it-related-words-finder';

export default function createItRelatedWordsFinder(): ItRelatedWordsFinder {
  return new ItRelatedWordsFinderImpl();
}
