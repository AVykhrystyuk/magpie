'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tagDetector = require('./tag-detection/impl/tag-detector');

Object.defineProperty(exports, 'TagDetectorImpl', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_tagDetector).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }