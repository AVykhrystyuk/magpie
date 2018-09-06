// @flow

export default function isWhitespaceOrEmpty(value: string): boolean {
  return !value || value.trim().length === 0;
}
