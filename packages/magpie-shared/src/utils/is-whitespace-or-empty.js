// @flow

const blankStringRegexp = /^\s*$/;

export default function isWhitespaceOrEmpty(value: string): boolean {
  return !value || blankStringRegexp.test(value);
}

// export default function isWhitespaceOrEmpty(value: string): boolean {
//   return !value || value.trim().length === 0;
// }
