/* eslint-disable flowtype/no-types-missing-file-annotation */

declare module 'magpie-shared' {

  declare export type TagAnalysisResult = {|
    valid: boolean,
    whiteWords: string[],
    blackWords: string[],
    tagIds: string[],
  |};

  declare export class TagAnalyzer {
    analyze(text: string): TagAnalysisResult;
  }

  declare export function createTagAnalyzer(): TagAnalyzer;



  declare type TagId = string;

  declare export class TagDetector {
    detectAll(text: string): TagId[];
  }

  declare export function createTagDetector(): TagDetector;



  declare export class BlackListedWordsFinder {
    findAll(text: string): string[];
    findOne(text: string): ?string;
  }

  declare export function createBlackListedWordsFinder(): BlackListedWordsFinder;



  declare export class WhiteListedWordsFinder {
    findAll(text: string): string[];
    findOne(text: string): ?string;
  }

  declare export function createWhiteListedWordsFinder(): WhiteListedWordsFinder;

}
