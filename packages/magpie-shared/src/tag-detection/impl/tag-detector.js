// @flow

// app
import type Tag, {TagId} from '../tag';
import TagDetector from '../tag-detector';
import JsTag from './js-tag';

export default class TagDetectorImpl extends TagDetector {
  _allTags: Tag[];

  constructor() {
    super();
    this._allTags = [new JsTag()];
  }
  detectAll(text: string): TagId[] {
    // TODO: filter negative words like 'Курс'
    return this._allTags.filter(t => t.isApplicableFor(text)).map(t => t.tagId);
  }
}
