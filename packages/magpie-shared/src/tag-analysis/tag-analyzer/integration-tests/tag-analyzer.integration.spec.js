// @flow strict

// lib
import { describe, it } from 'mocha';
import assert from 'assert';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
// app
import createTagAnalyzer from '../create-tag-analyzer';

const readFile = promisify(fs.readFile);

const resultValidMessage = 'Result should not be valid';
const resultInvalidMessage = 'Result should be valid';

const testDataDir = path.join(__dirname, '__test-data__');
const invalidDir = path.join(testDataDir, 'invalid');
const validDir = path.join(testDataDir, 'valid');

function readInvalidFile(fileName: string): Promise<string> {
  const filePath = path.join(invalidDir, fileName);
  return readFile(filePath, 'utf8');
}

// function readValidFile(fileName: string): Promise<string> {
//   const filePath = path.join(validDir, fileName);
//   return readFile(filePath, 'utf8');
// }

function readValidFrontEndFile(fileName: string): Promise<string> {
  const filePath = path.join(validDir, 'FrontEnd', fileName);
  return readFile(filePath, 'utf8');
}

function readValidDotNetFile(fileName: string): Promise<string> {
  const filePath = path.join(validDir, 'DotNet', fileName);
  return readFile(filePath, 'utf8');
}

function assertIncludes(field: string, allValues: string[], valuesToFind: string[]): void {
  const notFoundValue = valuesToFind.find(v => !allValues.includes(v));
  if (notFoundValue == null) {
    return;
  }

  const allValuesJoined = allValues.map(v => `'${v}'`).join(', ');
  assert.fail(`The following ${field} '${notFoundValue}' is not found in [${allValuesJoined}]`);
}

// function assertDoesNotIncludes(field: string, allValues: string[], valuesToFind: string[]): void {
//   const foundValue = valuesToFind.find(v => allValues.includes(v));
//   if (foundValue == null) {
//     return;
//   }
//
//   const allValuesJoined = allValues.map(v => `'${v}'`).join(', ');
//   assert.fail(`The following ${field} '${foundValue}' is found in [${allValuesJoined}]`);
// }

function assertTagIdsIncludes(allValues: string[], valuesToFind: string[]): void {
  assertIncludes('tag ids', allValues, valuesToFind);
}

function assertBlackWordIncludes(allValues: string[], valuesToFind: string[]): void {
  assertIncludes('black word', allValues, valuesToFind);
}

function assertWhiteWordIncludes(allValues: string[], valuesToFind: string[]): void {
  assertIncludes('white word', allValues, valuesToFind);
}

// function assertWhiteWordDoesNotIncludes(allValues: string[], valuesToFind: string[]): void {
//   assertDoesNotIncludes('white word', allValues, valuesToFind);
// }

describe('[Integration tests]: TagAnalyzer', () => {
  describe('Text analysis', () => {
    describe('does not find false-positives', () => {
      it('1_Workshop_Apache_Hadoop.txt', async () => {
        // arrange
        const tagAnalyzer = createTagAnalyzer();
        const file = await readInvalidFile('1_Workshop_Apache_Hadoop.txt');

        // act
        const result = tagAnalyzer.analyze(file);

        // assert
        assert.equal(result.valid, false, resultValidMessage);
        assertTagIdsIncludes(result.tagIds, []);
        assertBlackWordIncludes(result.blackWords, ['курс']);
        assertWhiteWordIncludes(result.whiteWords, []);
      });

      it('2_training_Apache_Spark.txt', async () => {
        // arrange
        const tagAnalyzer = createTagAnalyzer();
        const file = await readInvalidFile('2_training_Apache_Spark.txt');

        // act
        const result = tagAnalyzer.analyze(file);

        // assert
        assert.equal(result.valid, false, resultValidMessage);
        assertTagIdsIncludes(result.tagIds, []);
        assertBlackWordIncludes(result.blackWords, ['курса', 'тренинг']);
        assertWhiteWordIncludes(result.whiteWords, []);
      });

      it('3_seminar_tons_bad_words_only_few_white.txt', async () => {
        // arrange
        const tagAnalyzer = createTagAnalyzer();
        const file = await readInvalidFile('3_seminar_tons_bad_words_only_few_white.txt');

        // act
        const result = tagAnalyzer.analyze(file);

        // assert
        assert.equal(result.valid, false, resultValidMessage);
        assertTagIdsIncludes(result.tagIds, ['DotNet', 'JavaScript']);
        assertBlackWordIncludes(result.blackWords, [
          'семинара',
          'маркетологам',
          'СЕМИНАРЕ',
          'семинар',
          'семинаре',
          'бизнес',
          'бизнеса',
        ]);
        assertWhiteWordIncludes(result.whiteWords, []);
      });

      it('4_course_PHP.txt', async () => {
        // arrange
        const tagAnalyzer = createTagAnalyzer();
        const file = await readInvalidFile('4_course_PHP.txt');

        // act
        const result = tagAnalyzer.analyze(file);

        // assert
        assert.equal(result.valid, false, resultValidMessage);
        assertTagIdsIncludes(result.tagIds, ['JavaScript']);
        assertBlackWordIncludes(result.blackWords, ['Курс', 'курса']);
        assertWhiteWordIncludes(result.whiteWords, []);
      });

      it('5_course_PHP_for_schoolboys.txt', async () => {
        // arrange
        const tagAnalyzer = createTagAnalyzer();
        const file = await readInvalidFile('5_course_PHP_for_schoolboys.txt');

        // act
        const result = tagAnalyzer.analyze(file);

        // assert
        assert.equal(result.valid, false, resultValidMessage);
        assertTagIdsIncludes(result.tagIds, ['JavaScript']);
        assertBlackWordIncludes(result.blackWords, ['Курс', 'Занятия']);
        assertWhiteWordIncludes(result.whiteWords, []);
      });

      it('6_Live_Stream.txt', async () => {
        // arrange
        const tagAnalyzer = createTagAnalyzer();
        const file = await readInvalidFile('6_Live_Stream.txt');

        // act
        const result = tagAnalyzer.analyze(file);

        // assert
        assert.equal(result.valid, false, resultValidMessage);
        assertTagIdsIncludes(result.tagIds, ['iOS']);
        assertBlackWordIncludes(result.blackWords, ['курсе', 'трудоустройства']);
        assertWhiteWordIncludes(result.whiteWords, []);
      });

      it('7_course_js_online.txt', async () => {
        // arrange
        const tagAnalyzer = createTagAnalyzer();
        const file = await readInvalidFile('7_course_js_online.txt');

        // act
        const result = tagAnalyzer.analyze(file);

        // assert
        assert.equal(result.valid, false, resultValidMessage);
        assertTagIdsIncludes(result.tagIds, ['FrontEnd', 'JavaScript']);
        assertBlackWordIncludes(result.blackWords, [
          'Курс',
          'курсах',
          'трудоустройство',
          'занятия',
        ]);
        assertWhiteWordIncludes(result.whiteWords, []);
      });
    });

    describe('does find positives', () => {
      describe('in DotNet', () => {
        it('1_DotNET_MeetUp.txt', async () => {
          // arrange
          const tagAnalyzer = createTagAnalyzer();
          const file = await readValidDotNetFile('1_DotNET_MeetUp.txt');

          // act
          const result = tagAnalyzer.analyze(file);

          // assert
          assert.equal(result.valid, true, resultInvalidMessage);
          assertTagIdsIncludes(result.tagIds, ['DotNet']);
          assertBlackWordIncludes(result.blackWords, []);
          // prettier-ignore
          assertWhiteWordIncludes(result.whiteWords, ['MeetUp', 'митап']);
        });

        it('2_DotNetRu.txt', async () => {
          // arrange
          const tagAnalyzer = createTagAnalyzer();
          const file = await readValidDotNetFile('2_DotNetRu.txt');

          // act
          const result = tagAnalyzer.analyze(file);

          // assert
          assert.equal(result.valid, true, resultValidMessage);
          assertTagIdsIncludes(result.tagIds, ['DotNet']);
          assertBlackWordIncludes(result.blackWords, ['бизнеса', 'бизнес', 'занятия']);
          assertWhiteWordIncludes(result.whiteWords, [
            'конференциях',
            'конференций',
            'конференции',
          ]);
        });
      });

      describe('in FrontEnd', () => {
        it('1_Izh_Tech_Talks|FrontEnd.txt', async () => {
          // arrange
          const tagAnalyzer = createTagAnalyzer();
          const file = await readValidFrontEndFile('1_Izh_Tech_Talks|FrontEnd.txt');

          // act
          const result = tagAnalyzer.analyze(file);

          // assert
          assert.equal(result.valid, true, resultInvalidMessage);
          assertTagIdsIncludes(result.tagIds, ['FrontEnd']);
          assertBlackWordIncludes(result.blackWords, ['семинар']);
          // prettier-ignore
          assertWhiteWordIncludes(result.whiteWords, ['митап']);
        });

        it('2_js_meetup|FrontEnd_JavaScript.txt', async () => {
          // arrange
          const tagAnalyzer = createTagAnalyzer();
          const file = await readValidFrontEndFile('2_js_meetup|FrontEnd_JavaScript.txt');

          // act
          const result = tagAnalyzer.analyze(file);

          // assert
          assert.equal(result.valid, true, resultValidMessage);
          assertTagIdsIncludes(result.tagIds, ['FrontEnd', 'JavaScript']);
          assertBlackWordIncludes(result.blackWords, []);
          assertWhiteWordIncludes(result.whiteWords, ['meetup', 'митап']);
        });

        it('3_Krasnodar_Dev_Days|FrontEnd_JavaScript.txt', async () => {
          // arrange
          const tagAnalyzer = createTagAnalyzer();
          const file = await readValidFrontEndFile('3_Krasnodar_Dev_Days|FrontEnd_JavaScript.txt');

          // act
          const result = tagAnalyzer.analyze(file);

          // assert
          assert.equal(result.valid, true, resultValidMessage);
          assertTagIdsIncludes(result.tagIds, ['FrontEnd', 'JavaScript']);
          assertBlackWordIncludes(result.blackWords, []);
          assertWhiteWordIncludes(result.whiteWords, ['конференция', 'конференцию']);
          // assertWhiteWordDoesNotIncludes(result.whiteWords, ['программ', 'программу']);
        });
      });
    });
  });
});
