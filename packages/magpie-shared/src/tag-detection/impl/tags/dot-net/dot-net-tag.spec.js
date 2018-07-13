// @flow

// lib
import {describe, it, beforeEach} from 'mocha';
import assert from 'assert';

// app
import DotNetTag from './dot-net-tag';

function assertJsTagIsApplicable(jsTag: DotNetTag, text: string): void {
  assert.ok(
    jsTag.isApplicableFor(text),
    `Tag should be applicable for the following text: '${text}'`
  );
}

function assertJsTagIsNotApplicable(jsTag: DotNetTag, text: string): void {
  assert.ok(
    !jsTag.isApplicableFor(text),
    `Tag should NOT be applicable for the following text: '${text}'`
  );
}

describe('DotNetTag', () => {
  let assertTextAppliesToJsTag;
  let assertTextDoesNotApplyToJsTag;
  let tag;

  beforeEach(() => {
    tag = new DotNetTag();
    assertTextAppliesToJsTag = assertJsTagIsApplicable.bind(null, tag);
    assertTextDoesNotApplyToJsTag = assertJsTagIsNotApplicable.bind(null, tag);
  });

  it('it has tagId equals to "DotNet"', () => {
    assert.equal(tag.tagId, 'DotNet');
  });

  describe('Text case insensitive discovering', () => {
    it('when "DotNet" is part of a word', () => {
      const applicableTexts = [
        'тест SpbDotNet тест',
        'тест DotNetMoscow демо ',
        'тест PiterDotNet2017 демо ',
      ];

      applicableTexts.forEach(assertTextAppliesToJsTag);
    });

    it('when "." is used', () => {
      // prettier-ignore
      const applicableTexts = [
        'тест .NET тест',
        'тест .Net core демо ',
        'тест .neT-corE демо ',
        'текст ASP.NET Core ого',
        'текст ASP.NET MVC Core ого',
        'текст ASP.NET WebApi Core ого'
      ];

      applicableTexts.forEach(assertTextAppliesToJsTag);
    });

    it('when "C#" is used', () => {
      // prettier-ignore
      const applicableTexts = [
        'тест C# тест',
        'тест CSharp тест'
      ];

      applicableTexts.forEach(assertTextAppliesToJsTag);
    });
  });

  describe('Text ignoring', () => {
    it('for not related to any tag text', () => {
      // prettier-ignore
      const notApplicableTexts = [
        "bla let's go drink beer bla bla"
      ];

      // assert
      notApplicableTexts.forEach(assertTextDoesNotApplyToJsTag);
    });
  });
});
