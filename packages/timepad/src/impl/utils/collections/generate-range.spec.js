// @flow strict

import { generateRange } from './generate-range';

interface Item {
  id: number;
  data: string;
}

function createItem(id: number): Item {
  return {
    id,
    data: `item data for ${id}`,
  };
}

describe('[collections]: generate-range', () => {
  describe('count - overload', () => {
    test('returns array populated with indices', () => {
      const indices = generateRange(8);

      expect(indices).toBeDefined();
      expect(indices.length).toBe(8);
      expect(indices[0]).toBe(0);
      expect(indices[3]).toBe(3);
      expect(indices[7]).toBe(7);
    });
  });

  describe('startIndex+count - overload', () => {
    test('returns array populated with indices', () => {
      const indices = generateRange(4, 8);

      expect(indices).toBeDefined();
      expect(indices.length).toBe(4);
      expect(indices[0]).toBe(4);
      expect(indices[1]).toBe(5);
      expect(indices[3]).toBe(7);
    });
  });

  describe('count+factory - overload', () => {
    test('returns array populated with items', () => {
      const items = generateRange(6, createItem);

      expect(items).toBeDefined();
      expect(items.length).toBe(6);
      expect(items[0].data).toBe('item data for 0');
      expect(items[3].data).toBe('item data for 3');
      expect(items[5].data).toBe('item data for 5');
    });
  });

  describe('startIndex+count+factory - overload', () => {
    test('returns array populated with items', () => {
      const items = generateRange(2, 4, createItem);

      expect(items).toBeDefined();
      expect(items.length).toBe(2);
      expect(items[0].data).toBe('item data for 2');
      expect(items[1].data).toBe('item data for 3');
    });
  });
});
