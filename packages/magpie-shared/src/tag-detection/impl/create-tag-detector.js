/* eslint-disable class-methods-use-this */
// @flow

// app
import TagDetector from '../tag-detector';
import TagDetectorImpl from './tag-detector';
import {JsTag} from './tags';

export default function createTagDetector(): TagDetector {
  const tags = [new JsTag()];
  return new TagDetectorImpl(tags);
}
