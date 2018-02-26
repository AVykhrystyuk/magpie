/* eslint-disable class-methods-use-this, no-unused-vars */
/* istanbul ignore file */
// @flow

// app
import TagDetector from './tag-detector';

export default class TagDetectorFactory {
  create(): TagDetector {
    throw new TypeError('Abstract method');
  }
}
