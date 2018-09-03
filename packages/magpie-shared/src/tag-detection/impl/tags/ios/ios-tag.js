/* eslint-disable class-methods-use-this */
// @flow

// app
import TextCheckableTag from '../../text-checkable-tag';
import TextChecker from '../../../text-checker';
import {RegExpChecker} from '../../checkers';
import type {TagId} from '../../../tag';

export default class IosTag extends TextCheckableTag {
  tagId: TagId = 'iOS';

  // prettier-ignore
  checkers: TextChecker[] = [
    new RegExpChecker([
      /ios|swift/i,
      /obj-c|objc|objective-c/i
    ]),
  ];
}
