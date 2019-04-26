
// @flow strict

export type RangeFactory<T> = (index: number) => T;

declare function generateRange(count: number): number[];
// eslint-disable-next-line no-redeclare
declare function generateRange(startIndex: number, count: number): number[];
// eslint-disable-next-line no-redeclare
declare function generateRange<T>(count: number, factory: RangeFactory<T>): T[];
// eslint-disable-next-line no-redeclare
declare function generateRange<T>(startIndex: number, count: number, factory: RangeFactory<T>): T[];
// eslint-disable-next-line no-redeclare

// eslint-disable-next-line no-redeclare
function generateRange<T>(
  startIndexOrCount: number,
  countOrFactory?: number | RangeFactory<T>,
  factory?: RangeFactory<T>
): Array<number | T> {
  const factoryFromSecondArg = typeof countOrFactory === 'function' ? countOrFactory : null;

  const actualStartIndex = typeof countOrFactory === 'number' ? startIndexOrCount : 0;
  const actualCount = typeof countOrFactory === 'number' ? countOrFactory : startIndexOrCount;
  const actualFactory = factory || factoryFromSecondArg || ((i: number) => i);

  const indices: Array<number | T> = [];

  for (let index = actualStartIndex; index < actualCount; index++) {
    indices.push(
      actualFactory(index)
    );
  }

  return indices;
}

export default generateRange;
