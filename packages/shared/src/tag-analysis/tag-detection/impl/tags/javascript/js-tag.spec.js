// @flow strict

// lib
import { describe, it, beforeEach } from 'mocha';
import assert from 'assert';

// app
import { JsTag } from './js-tag';

function assertTagIsApplicable(tag: JsTag, text: string): void {
  assert.ok(
    tag.isApplicableFor(text),
    `Tag should be applicable for the following text: '${text}'`
  );
}

function assertTagIsNotApplicable(tag: JsTag, text: string): void {
  assert.ok(
    !tag.isApplicableFor(text),
    `Tag should NOT be applicable for the following text: '${text}'`
  );
}

describe('JsTag', () => {
  let assertTextAppliesToTag;
  let assertTextDoesNotApplyToTag;
  let tag;

  beforeEach(() => {
    tag = new JsTag();
    assertTextAppliesToTag = assertTagIsApplicable.bind(null, tag);
    assertTextDoesNotApplyToTag = assertTagIsNotApplicable.bind(null, tag);
  });

  it('it has tagId equals to "JavaScript"', () => {
    assert.equal(tag.tagId, 'JavaScript');
  });

  describe('Text case insensitive discovering', () => {
    it('when "JavaScript" is part of a word', () => {
      const applicableTexts = [
        ' bla PiterJAVASCRIPT bla ',
        'bla Piter.JavaScript',
        'Node.javascript Spb',
        'bla javascript2016 bla',
        'SuperJavaScriptMeetup',
      ];

      applicableTexts.forEach(assertTextAppliesToTag);
    });

    it('when "JS" is part of a word with some exceptions', () => {
      const applicableTexts = [
        ' bla PiterJs bla ',
        'bla Piter.JS',
        'Node.JS Spb',
        'bla js2016 bla',
        'SuperJsMeetup',
      ];

      // prettier-ignore
      const notApplicableTexts = [
        'bla bla json bld',
        'bla bla JSonium bld',
      ];

      applicableTexts.forEach(assertTextAppliesToTag);
      notApplicableTexts.forEach(assertTextDoesNotApplyToTag);
    });

    it('when "JavaScript" or "JS" word exists in text', () => {
      const applicableTexts = [
        'bla Js bla',
        'bla JavaScript bla',

        'js Spb',
        'javascript 2016 Spb',

        'bla JS',
        'bla Javascript',
      ];

      applicableTexts.forEach(assertTextAppliesToTag);
    });

    // figure out what to do with abbreviation ("ES") - https://www.thefreedictionary.com/words-containing-es
    it('when "ECMAScript" is part of a word or exists in text as is', () => {
      const applicableTexts = [
        'bla ECMAScript 6 bla',
        'bla ECMAScript6 bla',
        'bla MoscowECMAScript bla',

        'bla тест ES-2015 тест sds', // ES6
        'bla тест ES2009 тест sds', // ES5
        'bla текст ES7 текст Spb',
        'bla es.next ', // ES7, ES2016, or ES.Next
        'bla esNext',
      ];

      const notApplicableTexts = [
        'bla ES-2015dsda sds',
        'bla essential dsds',
        'ES7dsd Spb',
        'bla es.nextdsad',
        'bla esNextaaaa',
      ];

      applicableTexts.forEach(assertTextAppliesToTag);
      notApplicableTexts.forEach(assertTextDoesNotApplyToTag);
    });

    describe('Framework related', () => {
      it('frameworks/libs in text as a separated word', () => {
        const applicableTexts = [
          'bla Angular 6 bla',
          'bla Ember bla',
          'bla Vue sds',
          ' Angular 6 bla',
          'Ember bla',
          ' Vue sds',
          'Writing on Vue',
        ];

        applicableTexts.forEach(assertTextAppliesToTag);
      });

      it('frameworks/libs as prefix or postfix', () => {
        // prettier-ignore
        const applicableTexts = [
          'bla AngularPiter',
          'EmberMoscow bla',
          'blaaaaha SamaraVue 2017'
        ];

        applicableTexts.forEach(assertTextAppliesToTag);
      });

      it('ignores not applicable words contain frameworks inside', () => {
        const notApplicableTexts = ['whose mEmBeRs include'];

        notApplicableTexts.forEach(assertTextDoesNotApplyToTag);
      });
    });

    it('when React related words exist in text', () => {
      const helpedWords = [
        'meetup',
        'meet-up',
        'conf',

        'dom',
        'render',

        'web',
        'ui',
        'interface',
        'user',

        'dev',
        'develop',
        'developing',
        'development',

        'frontend',
        'front-end',
      ];

      const reactWithHelperWords = helpedWords.map(w => ` bla React bla ${w} bla `);

      // prettier-ignore
      const applicableTitles = [
        'React Finland',
        'dsds. React Moscow 2016. dsds'
      ];

      const definitelyNotApplicableTexts = [
        'bla react moscow',
        'dude, just react!',
        'she reacted really weird',
        'wow this is god damn reaction',
        'ds Reactive Spring',
        'reaction sub-native',
      ];

      // prettier-ignore
      const applicableTexts = [
        'react native'
      ];
      applicableTexts.push(...applicableTitles);
      applicableTexts.push(...reactWithHelperWords);

      // assert
      applicableTexts.forEach(assertTextAppliesToTag);
      definitelyNotApplicableTexts.forEach(assertTextDoesNotApplyToTag);
    });

    it('when NodeJS Ecosystem related popular words exist in text', () => {
      const definitelyApplicableWords = ['npm', 'yarn', 'grunt', 'gulp', 'webpack'];

      const applicableTexts = definitelyApplicableWords.map(w => ` bla ${w} bla `);
      const notApplicableTexts = definitelyApplicableWords.map(w => ` bla${w}bla `);

      // assert
      applicableTexts.forEach(assertTextAppliesToTag);
      notApplicableTexts.forEach(assertTextDoesNotApplyToTag);
    });
  });

  describe('Text ignoring', () => {
    it('for not related to any tag text', () => {
      // prettier-ignore
      const notApplicableTexts = [
        "bla let's go drink beer bla bla",
      ];

      // assert
      notApplicableTexts.forEach(assertTextDoesNotApplyToTag);
    });

    it('for markup script tag', () => {
      // prettier-ignore
      const notApplicableTexts = [
        `&lt;script type="text/javascript" async="async" defer="defer" charset="UTF-8" src="//timepad.ru/js/tpwf/loader.min.js" data-timepad-widget="org_subscribe"&gt;
(function(){return {"orgtag":"zhenechka","orgid":"129622"}; })();
&lt;/script&gt;`
      ];

      // assert
      notApplicableTexts.forEach(assertTextDoesNotApplyToTag);
    });
  });
});
