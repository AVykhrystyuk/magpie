/* eslint-disable class-methods-use-this */
// @flow

// app
import TextCheckableTag from '../../text-checkable-tag';
import TextChecker from '../../../text-checker';
import {RegExpChecker} from '../../checkers';
import type {TagId} from '../../../tag';

export default class DotNetTag extends TextCheckableTag {
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
