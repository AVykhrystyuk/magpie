/* eslint-disable class-methods-use-this */
// @flow

// app
import type Tag, {TagId} from '../tag';
import TagDetector from '../tag-detector';

export default class TagDetectorImpl extends TagDetector {
  _tags: Tag[];

  constructor(tags: Tag[]) {
    super();
    this._tags = tags;
  }

  detectAll(text: string): TagId[] {
    if (this._isBlankString(text)) {
      return [];
    }

    // prettier-ignore
    return this._tags
      .filter(t => t.isApplicableFor(text))
      .map(t => t.tagId);
  }

  _isBlankString(text: string): boolean {
    return !text || /^\s*$/.test(text);
  }
}
