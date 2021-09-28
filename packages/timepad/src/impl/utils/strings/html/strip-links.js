// @flow strict

export function stripLinks(text: string): string {
  return text.replace(/(https?:\/\/[^\s]+)/g, '');
}
