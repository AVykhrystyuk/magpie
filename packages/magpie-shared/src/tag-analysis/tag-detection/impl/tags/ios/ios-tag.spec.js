// @flow

// lib
import { describe, it, beforeEach } from 'mocha';
import assert from 'assert';

// app
import IosTag from './ios-tag';

function assertTagIsApplicable(tag: IosTag, text: string): void {
  assert.ok(
    tag.isApplicableFor(text),
    `Tag should be applicable for the following text: '${text}'`
  );
}

function assertTagIsNotApplicable(tag: IosTag, text: string): void {
  assert.ok(
    !tag.isApplicableFor(text),
    `Tag should NOT be applicable for the following text: '${text}'`
  );
}

describe('IosTag', () => {
  let assertTextAppliesToTag;
  let assertTextDoesNotApplyToTag;
  let tag;

  beforeEach(() => {
    tag = new IosTag();
    assertTextAppliesToTag = assertTagIsApplicable.bind(null, tag);
    assertTextDoesNotApplyToTag = assertTagIsNotApplicable.bind(null, tag);
  });

  it('it has tagId equals to "iOS"', () => {
    assert.equal(tag.tagId, 'iOS');
  });

  describe('Text case insensitive discovering', () => {
    it('when "iOS" is part of a word', () => {
      const applicableTexts = [
        'тест iOS тест',
        'тест DEV 2018: iOS meetup демо ',
        'тест iOS-разработка демо ',
      ];

      applicableTexts.forEach(assertTextAppliesToTag);
    });

    it('when "Obj-C" is used', () => {
      // prettier-ignore
      const applicableTexts = [
        'тест Obj-C тес ',
        'тест ObjC демо ',
        'тест Objective-C тес ',
      ];

      applicableTexts.forEach(assertTextAppliesToTag);
    });

    it('when "Swift" is used', () => {
      // prettier-ignore
      const applicableTexts = [
        'тест Swift-разработчик тест ',
      ];

      applicableTexts.forEach(assertTextAppliesToTag);
    });

    it('when "Swift" is used as part of the word with a context', () => {
      // prettier-ignore
      const applicableTexts = [
        'тест Swiftify тест mobile dev ',
      ];

      applicableTexts.forEach(assertTextAppliesToTag);
    });
  });

  describe('Text ignoring', () => {
    it('for not related to tag text', () => {
      // prettier-ignore
      const notApplicableTexts = [
        ' Внешние системы мониторинга: Zabbix, JMX, Grafana, Nagios, Ganglia ',
        ' Ничего общего '
      ];

      // assert
      notApplicableTexts.forEach(assertTextDoesNotApplyToTag);
    });
  });
});
