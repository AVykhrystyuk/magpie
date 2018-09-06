/* eslint-disable class-methods-use-this, no-unused-vars */
/* istanbul ignore file */
// @flow

export type TagAnalysisResult = {|
  valid: boolean,
  whiteWords: string[],
  blackWords: string[],
  tagIds: string[],
|};

export default class TagAnalyzer {
  analize(text: string): TagAnalysisResult {
    throw new TypeError('Abstract method');
  }
}
