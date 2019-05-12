// @flow strict

import groupBy from './group-by';
import generateRange from './generate-range';

interface DataRecord {
  id: number;
  isEven: boolean;
}

function createDataRecord(id: number): DataRecord {
  return {
    id,
    isEven: id % 2 === 0,
  };
}

describe('[collections]: group-by', () => {
  test('groups using key selector function', () => {
    const dataRecords = generateRange(5, createDataRecord);

    const groups = groupBy(dataRecords, r => r.isEven);

    expect(groups).toBeDefined();
    expect(groups.size).toBe(2);
    const evenDataRecords = groups.get(true) || [];
    expect(evenDataRecords.length).toBe(3);
    evenDataRecords.forEach(record => expect(record.isEven).toBe(true));

    const oddDataRecords = groups.get(false) || [];
    expect(oddDataRecords.length).toBe(2);
    oddDataRecords.forEach(record => expect(record.isEven).toBe(false));
  });
});
