// @flow

// app
import TextCheckableTag from '../../text-checkable-tag';
import TextChecker from '../../../text-checker';
import { RegExpChecker } from '../../checkers/index';
import type { TagId } from '../../../tag';

export default class FrontEndTag extends TextCheckableTag {
  tagId: TagId = 'FrontEnd';

  // prettier-ignore
  checkers: TextChecker[] = [
    new RegExpChecker([
      /front-?end(?:er|ers)?/i,
      /(?:^|\s|[,.;!?])фронт-?енд[а-яё]*/i,
    ]),
  ];
}
