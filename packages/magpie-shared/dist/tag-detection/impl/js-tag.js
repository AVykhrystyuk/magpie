'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tag = require('../tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class JsTag extends _tag2.default {

  constructor() {
    super();

    this.tagId = 'JavaScript';
    this.keyWordsRegExp = /js(?!on)|javascript|ECMAScript/i;
  }

  isApplicableFor(text) {
    if (this.keyWordsRegExp.test(text)) {
      return true;
    }

    return false;
  }
}
exports.default = JsTag; /* eslint-disable class-methods-use-this */


// app