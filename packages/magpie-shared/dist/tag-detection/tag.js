'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class Tag {

  isApplicableFor(text) {
    throw new TypeError('Abstract method');
  }
}
exports.default = Tag; /* eslint-disable class-methods-use-this, no-unused-vars */