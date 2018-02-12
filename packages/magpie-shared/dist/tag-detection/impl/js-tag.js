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
  }

  isApplicableFor(text) {
    return text != null;
  }
}
exports.default = JsTag; /* eslint-disable class-methods-use-this */


// app