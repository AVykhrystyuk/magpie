// @flow strict

// app
import { TextCheckableTag } from '../../text-checkable-tag';
import { TextChecker } from '../../../text-checker';
import { RegExpChecker } from '../../checkers/index';
import type { TagId } from '../../../tag';

export class DotNetTag extends TextCheckableTag {
  tagId: TagId = 'DotNet';

  // prettier-ignore
  checkers: TextChecker[] = [
    new RegExpChecker([
      /(?:^|\s|[,.;!?])(?:asp)?\.net(?:[\s-]?core)?/i, // .NET, .net core, .net-core, asp.net
      /(?:dot[\s-]?)net(?:[\s-]?core)?/i, // dotnet, dot-net-core, dotnetcore
      /CSharp|C#/i
    ]),
  ];
}
