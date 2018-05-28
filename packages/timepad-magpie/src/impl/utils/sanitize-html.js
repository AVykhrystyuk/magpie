// @flow

// lib
import sanitizeHtml from 'sanitize-html';

// prettier-ignore
const sanitizeOptions = {
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

const stripOptions = {
  allowedTags: [],
  allowedAttributes: [],
};

export function stripHtml(html: string): string {
  return sanitizeHtml(html, stripOptions);
}

export default function sanitize(html: string): string {
  return sanitizeHtml(html, sanitizeOptions);
}
