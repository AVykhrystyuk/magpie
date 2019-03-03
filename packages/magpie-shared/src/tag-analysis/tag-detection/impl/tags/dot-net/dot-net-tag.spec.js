// @flow strict

// lib
import { describe, it, beforeEach } from 'mocha';
import assert from 'assert';

// app
import DotNetTag from './dot-net-tag';

function assertTagIsApplicable(tag: DotNetTag, text: string): void {
  assert.ok(
    tag.isApplicableFor(text),
    `Tag should be applicable for the following text: '${text}'`
  );
}

function assertTagIsNotApplicable(tag: DotNetTag, text: string): void {
  assert.ok(
    !tag.isApplicableFor(text),
    `Tag should NOT be applicable for the following text: '${text}'`
  );
}

describe('DotNetTag', () => {
  let assertTextAppliesToTag;
  let assertTextDoesNotApplyToTag;
  let tag;

  beforeEach(() => {
    tag = new DotNetTag();
    assertTextAppliesToTag = assertTagIsApplicable.bind(null, tag);
    assertTextDoesNotApplyToTag = assertTagIsNotApplicable.bind(null, tag);
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

      applicableTexts.forEach(assertTextAppliesToTag);
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

      applicableTexts.forEach(assertTextAppliesToTag);
    });

    it('when "C#" is used', () => {
      // prettier-ignore
      const applicableTexts = [
        'тест C# тест',
        'тест CSharp тест'
      ];

      applicableTexts.forEach(assertTextAppliesToTag);
    });
  });

  describe('Text ignoring', () => {
    it('for not related to any tag text', () => {
      // prettier-ignore
      const notApplicableTexts = [
        "bla let's go drink beer bla bla"
      ];

      // assert
      notApplicableTexts.forEach(assertTextDoesNotApplyToTag);
    });
  });
});
