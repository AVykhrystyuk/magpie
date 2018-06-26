// @flow

// lib
import {describe, it, beforeEach} from 'mocha';
import assert from 'assert';

// app
import JsTag from './js-tag';

// const flatMap = (arr, selector) => [].concat(...arr.map(selector));

function assertJsTagIsApplicable(jsTag: JsTag, text: string): void {
  assert.ok(
    jsTag.isApplicableFor(text),
    `Tag should be applicable for the following text: '${text}'`
  );
}

function assertJsTagIsNotApplicable(jsTag: JsTag, text: string): void {
  assert.ok(
    !jsTag.isApplicableFor(text),
    `Tag should NOT be applicable for the following text: '${text}'`
  );
}

describe('JsTag', () => {
  let assertTextAppliesToJsTag;
  let assertTextDoesNotApplyToJsTag;

  beforeEach(() => {
    const jsTag = new JsTag();
    assertTextAppliesToJsTag = assertJsTagIsApplicable.bind(null, jsTag);
    assertTextDoesNotApplyToJsTag = assertJsTagIsNotApplicable.bind(null, jsTag);
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

      applicableTexts.forEach(assertTextAppliesToJsTag);
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

      applicableTexts.forEach(assertTextAppliesToJsTag);
      notApplicableTexts.forEach(assertTextDoesNotApplyToJsTag);
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

      applicableTexts.forEach(assertTextAppliesToJsTag);
    });

    // figure out what to do with abbreviation ("ES") - https://www.thefreedictionary.com/words-containing-es
    it('when "ECMAScript" is part of a word or exists in text as is', () => {
      const applicableTexts = [
        'bla ECMAScript 6 bla',
        'bla ECMAScript6 bla',
        'bla MoscowECMAScript bla',

        'bla ES-2015 sds', // ES6
        'bla ES2009 sds', // ES5
        'bla ES7 Spb',
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

      applicableTexts.forEach(assertTextAppliesToJsTag);
      notApplicableTexts.forEach(assertTextDoesNotApplyToJsTag);
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

        applicableTexts.forEach(assertTextAppliesToJsTag);
      });

      it('frameworks/libs as prefix or postfix', () => {
        // prettier-ignore
        const applicableTexts = [
          'bla AngularPiter',
          'EmberMoscow bla',
          'blaaaaha SamaraVue 2017'
        ];

        applicableTexts.forEach(assertTextAppliesToJsTag);
      });

      it('ignores not applicable words contain frameworks inside', () => {
        const notApplicableTexts = ['whose mEmBeRs include'];

        notApplicableTexts.forEach(assertTextDoesNotApplyToJsTag);
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
      applicableTexts.forEach(assertTextAppliesToJsTag);
      definitelyNotApplicableTexts.forEach(assertTextDoesNotApplyToJsTag);
    });

    it('when NodeJS Ecosystem related popular words exist in text', () => {
      const definitelyApplicableWords = ['npm', 'yarn', 'grunt', 'gulp', 'webpack'];

      const applicableTexts = definitelyApplicableWords.map(w => ` bla ${w} bla `);
      const notApplicableTexts = definitelyApplicableWords.map(w => ` bla${w}bla `);

      // assert
      applicableTexts.forEach(assertTextAppliesToJsTag);
      notApplicableTexts.forEach(assertTextDoesNotApplyToJsTag);
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
