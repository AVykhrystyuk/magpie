// @flow strict

// app
import type Tag, { TagId } from '../tag';
import TagDetector from '../tag-detector';
import { isWhitespaceOrEmpty } from '../../../utils';

export default class TagDetectorImpl extends TagDetector {
  _tags: Tag[];

  constructor(tags: Tag[]) {
    super();
    this._tags = tags;
  }

  detectAll(text: string): TagId[] {
    if (isWhitespaceOrEmpty(text)) {
      return [];
    }

    // prettier-ignore
    return this._tags
      .filter(t => t.isApplicableFor(text))
      .map(t => t.tagId);
  }
}
