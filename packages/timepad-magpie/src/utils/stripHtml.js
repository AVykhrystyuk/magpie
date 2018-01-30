// @flow

// lib
import sanitizeHtml from 'sanitize-html';

const options = {
  allowedTags: [],
  allowedAttributes: [],
};

export default function stripHtml(html: string) {
  return sanitizeHtml(html, options);
}
