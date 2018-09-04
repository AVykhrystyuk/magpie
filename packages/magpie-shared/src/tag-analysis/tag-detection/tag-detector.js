/* eslint-disable class-methods-use-this, no-unused-vars */
/* istanbul ignore file */
// @flow

import type { TagId } from './tag';

export default class TagDetector {
  detectAll(text: string): TagId[] {
    throw new TypeError('Abstract method');
  }
}
