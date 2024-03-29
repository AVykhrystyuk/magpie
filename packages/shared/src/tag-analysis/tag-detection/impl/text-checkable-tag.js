// @flow strict

// app
import { Tag } from '../tag';
import { TextChecker } from '../text-checker';

export class TextCheckableTag extends Tag {
  +checkers: TextChecker[];

  isApplicableFor(text: string): boolean {
    return this.checkers.some(c => c.check(text));
  }
}
