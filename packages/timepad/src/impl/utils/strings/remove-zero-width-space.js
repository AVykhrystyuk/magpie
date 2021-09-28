// @flow strict
/*
  Unicode has the following zero-width characters:

  U+200B zero width space
  U+200C zero width non-joiner Unicode code point
  U+200D zero width joiner Unicode code point
  U+FEFF zero width no-break space Unicode code point
 */
export function removeZeroWidthSpace(text: string): string {
  return text.replace(/[\u200B-\u200D\uFEFF]/g, '');
}
