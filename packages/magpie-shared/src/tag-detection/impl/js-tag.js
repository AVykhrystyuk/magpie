/* eslint-disable class-methods-use-this */
// @flow

// app
import Tag from '../tag';
import type {TagId} from '../tag';

export default class JsTag extends Tag {
  tagId: TagId;

  constructor() {
    super();

    this.tagId = 'JavaScript';
  }

  isApplicableFor(text: string): boolean {
    return text != null;
  }
}
