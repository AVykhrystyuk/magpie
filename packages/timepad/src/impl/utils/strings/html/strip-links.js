// @flow strict

export default function stripLinks(text: string): string {
  return text.replace(/(https?:\/\/[^\s]+)/g, '');
}
