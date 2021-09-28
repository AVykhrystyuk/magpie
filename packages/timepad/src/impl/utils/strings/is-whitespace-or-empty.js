// @flow strict

export function isWhitespaceOrEmpty(value: string): boolean {
  return !value || value.trim().length === 0;
}
