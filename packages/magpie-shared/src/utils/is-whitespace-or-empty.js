// @flow

const blankTextRegexp = /^\s*$/;

export default function isWhitespaceOrEmpty(value: string): boolean {
  return !value || blankTextRegexp.test(value);
}
