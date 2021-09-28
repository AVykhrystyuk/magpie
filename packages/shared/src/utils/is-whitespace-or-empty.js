// @flow strict

const blankTextRegexp = /^\s*$/;

export function isWhitespaceOrEmpty(value: string): boolean {
  return !value || blankTextRegexp.test(value);
}
