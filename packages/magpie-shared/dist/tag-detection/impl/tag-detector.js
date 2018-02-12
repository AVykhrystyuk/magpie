'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tagDetector = require('../tag-detector');

var _tagDetector2 = _interopRequireDefault(_tagDetector);

var _jsTag = require('./js-tag');

var _jsTag2 = _interopRequireDefault(_jsTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TagDetectorImpl extends _tagDetector2.default {

  constructor() {
    super();
    this._allTags = [new _jsTag2.default()];
  }
  detectAll(text) {
    // TODO: filter negative words like 'Курс'
    return this._allTags.filter(t => t.isApplicableFor(text)).map(t => t.tagId);
  }
}
exports.default = TagDetectorImpl;

// app