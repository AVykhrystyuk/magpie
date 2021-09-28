// @flow strict

// app
import { Tag } from '../../../tag';
import type { TagId } from '../../../tag';

export class IosTag extends Tag {
  tagId: TagId = 'iOS';

  // prettier-ignore
  keyWordRegExps: RegExp[] = [
    /\b(?:ios|swift)\b/i,
    /\b(?:obj-c|objc|objective-c)\b/i
  ];

  // prettier-ignore
  additionalKeyWordRegExps: RegExp[] = [
    /ios|swift/i,
    /obj-c|objc|objective-c/i
  ];

  // prettier-ignore
  contextKeyWordRegExps: RegExp[] = [
    /mobile|apple/i,
    /мобильн[а-яё]*/gi,
  ];

  isApplicableFor(text: string): boolean {
    const validForText = regexp => regexp.test(text);

    const hasKeyWord = this.keyWordRegExps.some(validForText);
    if (hasKeyWord) {
      return true;
    }

    const hasAdditionalKeyWord = this.additionalKeyWordRegExps.some(validForText);
    if (hasAdditionalKeyWord) {
      return this.contextKeyWordRegExps.some(validForText);
    }

    return false;
  }
}
