/* istanbul ignore file */
// @flow strict

// app
import TagDetector from './tag-detector';
import TagDetectorImpl from './impl/tag-detector';
import { DotNetTag, FrontEndTag, IosTag, JsTag, DevOpsTag } from './impl/tags';

export default function createTagDetector(): TagDetector {
  // prettier-ignore
  const tags = [
    new DotNetTag(),
    new FrontEndTag(),
    new IosTag(),
    new JsTag(),
    new DevOpsTag()
  ];
  return new TagDetectorImpl(tags);
}
