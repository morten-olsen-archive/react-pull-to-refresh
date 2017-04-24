'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = _propTypes2.default.shape({
  scrollToStart: _propTypes2.default.func.isRequired,
  scrollToEnd: _propTypes2.default.func.isRequired,
  addEventListener: _propTypes2.default.func.isRequired,
  removeEventListener: _propTypes2.default.func.isRequired,
  triggerEvent: _propTypes2.default.func.isRequired,
  getScrollContainer: _propTypes2.default.func.isRequired,
  scrollToTop: _propTypes2.default.func.isRequired,
  scrollToBottom: _propTypes2.default.func.isRequired
});

api.parent = api;

exports.default = api;