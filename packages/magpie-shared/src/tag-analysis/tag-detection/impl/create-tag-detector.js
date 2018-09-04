/* eslint-disable class-methods-use-this */
// @flow

// app
import TagDetector from '../tag-detector';
import TagDetectorImpl from './tag-detector';
import { JsTag, DotNetTag, FrontEndTag } from './tags/index';

export default function createTagDetector(): TagDetector {
  // prettier-ignore
  const tags = [
    new JsTag(),
    new DotNetTag(),
    new FrontEndTag()
  ];
  return new TagDetectorImpl(tags);
}
