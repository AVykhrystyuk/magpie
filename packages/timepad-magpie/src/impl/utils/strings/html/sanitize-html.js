// @flow strict

// lib
import sanitizeHtml from 'sanitize-html';
import type { SanitizeOptions } from 'sanitize-html';

const sharedOptions: SanitizeOptions = {
  textFilter(text) {
    return text.replace(/&quot;/g, '"');
  },
};

// prettier-ignore
const sanitizeOptions: SanitizeOptions = {
  ...sharedOptions,
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a',
    'ul', 'ol', 'li',
    'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br',
    'div', // 'span'
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'pre', 'caption'
  ],
  allowedAttributes: {
    a: ['href']
  },
};

const stripOptions: SanitizeOptions = {
  ...sharedOptions,
  allowedTags: [],
  allowedAttributes: {},
};

export function stripHtml(html: string): string {
  return sanitizeHtml(html, stripOptions);
}

export default function sanitize(html: string): string {
  return sanitizeHtml(html, sanitizeOptions);
}
