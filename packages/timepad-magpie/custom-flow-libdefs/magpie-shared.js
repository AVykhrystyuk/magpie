declare module 'magpie-shared' {
  declare type TagId = string;

  declare export class TagDetector {
    detectAll(text: string): TagId[];
  }

  declare export function createTagDetector(): TagDetector;

  declare export class BlackListedWordsFinder {
    find(text: string): string[];
  }

  declare export function createBlackListedWordsFinder(): BlackListedWordsFinder;
}
