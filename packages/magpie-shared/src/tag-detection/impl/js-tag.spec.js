import assert from 'assert';

import JsTag from './js-tag';

const flatMap = (arr, selector) => [].concat(...arr.map(selector));

function assertTagIsApplicable(jsTag, text) {
  assert.ok(jsTag.isApplicableFor(text), `Tag is not applicable (but should be) for the following text: '${text}'`);
}

function assertTagIsNotApplicable(jsTag, text) {
  assert.ok(!jsTag.isApplicableFor(text), `Tag is applicable (but should not be) for the following text: '${text}'`);
}

describe('JsTag', () => {
  let jsTag;

  beforeEach(() => {
    jsTag = new JsTag();
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

      applicableTexts.forEach(text => assertTagIsApplicable(jsTag, text));
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

      applicableTexts.forEach(text => assertTagIsApplicable(jsTag, text));
      notApplicableTexts.forEach(text => assertTagIsNotApplicable(jsTag, text));
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

      applicableTexts.forEach(text => assertTagIsApplicable(jsTag, text));
    });

    // figure out what to do with abbreviation ("ES") - https://www.thefreedictionary.com/words-containing-es
    it('when "ECMAScript" is part of a word or exists in text as is', () => {
      const applicableTexts = [
        'bla ECMAScript 6 bla',
        'bla ECMAScript6 bla',
        'bla MoscowECMAScript bla',

        // 'js ES6 sds',
        // 'ES7 Spb',
        // 'bla ESnext',
      ];

      applicableTexts.forEach(text => assertTagIsApplicable(jsTag, text));
    });

    it('when very popular framework or library name exists in text', () => {
      // prettier-ignore
      const applicableTexts = [
        'bla Angular 6 bla',
        'bla Ember bla',
        'bla Vue sds',
        ' Angular 6 bla',
        'Ember bla',
        ' Vue sds',
        'Writing on Vue',
      ];

      applicableTexts.forEach(text => assertTagIsApplicable(jsTag, text));
    });

    it('when very popular framework or library name is a part of a word', () => {
      // prettier-ignore
      const applicableTexts = [
        'bla AngularPiter',
        'EmberMoscow bla',
        'blaaaaha SamaraVue 2017'
      ];

      applicableTexts.forEach(text => assertTagIsApplicable(jsTag, text));
    });

    it('when React related words exist in text', () => {
      const helpedWords = [
        'meetup',
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

      // prettier-ignore
      const yetNotApplicableTexts = [
        'bla react'
      ];

      // prettier-ignore
      const applicableTexts = flatMap(
        yetNotApplicableTexts,
        text => helpedWords.map(w => ` bla ${text} bla ${w} bla `)
      );

      const definitelyNotApplicableTexts = [
        'bla react moscow',
        'dude, just react!',
        'she reacted really weird',
        'wow this is god damn reaction',
      ];

      // prettier-ignore
      const applicableCollocations = [
        'react native'
      ];

      applicableTexts.forEach(text => assertTagIsApplicable(jsTag, text));
      definitelyNotApplicableTexts.forEach(text => assertTagIsNotApplicable(jsTag, text));
      applicableCollocations.forEach(text => assertTagIsApplicable(jsTag, text));
    });

    it('when NodeJS Ecosystem related popular words exist in text', () => {
      const definitelyApplicableWords = [
        'npm',
        'yarn',
        'grunt',
        'gulp',
        'webpack',
        'express',
        'koa',
      ];

      const applicableTexts = definitelyApplicableWords.map(w => ` bla ${w} bla `);

      applicableTexts.forEach(text => assertTagIsApplicable(jsTag, text));
    });
  });

  describe('Text ignoring', () => {
    it('for not related to any tag text', () => {
      // prettier-ignore
      const notApplicableTexts = [
        "bla let's go drink beer bla bla"
      ];

      notApplicableTexts.forEach(text => assertTagIsNotApplicable(jsTag, text));
    });
  });
});
