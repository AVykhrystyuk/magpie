import assert from 'assert';

import calculate from './calculate';

describe('Calculator', () => {
  describe('calculate', () => {
    it('should return 6 when requested to calculate 1 and 5', () => {
      const result = calculate({value1: 1, value2: 5});
      assert.equal(result, 6);
    });

    it('should return 3 when requested to calculate -1 and 4', () => {
      const result = calculate({value1: -1, value2: 4});
      assert.equal(result, 3);
    });
  });
});
