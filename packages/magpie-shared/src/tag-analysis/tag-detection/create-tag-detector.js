/* eslint-disable class-methods-use-this */
// @flow

// app
import TagDetector from './tag-detector';
import TagDetectorImpl from './impl/tag-detector';
import { DotNetTag, FrontEndTag, IosTag, JsTag } from './impl/tags';

export default function createTagDetector(): TagDetector {
  // prettier-ignore
  const tags = [
    new DotNetTag(),
    new FrontEndTag(),
    new IosTag(),
    new JsTag(),
  ];
  return new TagDetectorImpl(tags);
}
