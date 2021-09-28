// @flow strict

export function groupBy<TKey, TItem>(
  items: $ReadOnlyArray<TItem>,
  keySelector: (item: TItem) => TKey
): Map<TKey, TItem[]> {
  return items.reduce((map: Map<TKey, TItem[]>, item: TItem) => {
    const key = keySelector(item);

    let keyedItems = map.get(key);
    if (keyedItems == null) {
      keyedItems = [];
      map.set(key, keyedItems);
    }

    keyedItems.push(item);
    return map;
  }, (new Map(): Map<TKey, TItem[]>));
}
