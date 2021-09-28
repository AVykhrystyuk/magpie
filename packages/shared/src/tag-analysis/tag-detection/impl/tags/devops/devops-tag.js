// @flow strict

// app
import { Tag } from '../../../tag';
import type { TagId } from '../../../tag';

export class DevOpsTag extends Tag {
  tagId: TagId = 'DevOps';

  // prettier-ignore
  keyWordRegExps: RegExp[] = [
    /\bdevops\b/i,
  ];

  isApplicableFor(text: string): boolean {
    return this.keyWordRegExps.some(regexp => regexp.test(text));
  }
}
