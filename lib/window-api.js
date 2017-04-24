'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _scrollApi = require('./scroll-api.js');

var _scrollApi2 = _interopRequireDefault(_scrollApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var windowApi = new _scrollApi2.default({
  element: global.document.body
});
var atTheEnd = false;
var handleAtEnd = function handleAtEnd() {
  var distanceToEnd = windowApi.getDistanceToBottom(global.window.innerHeight);
  if (!atTheEnd) {
    if (distanceToEnd <= 0) {
      windowApi.triggerEvent('onend', {});
      atTheEnd = true;
    }
  } else if (distanceToEnd > 0) {
    atTheEnd = false;
  }
};
global.document.addEventListener('scroll', function (evt) {
  windowApi.triggerEvent('scroll', evt);
});
windowApi.addEventListener('scroll', handleAtEnd);

exports.default = windowApi.getPublicApi({
  scrollToStart: windowApi.scrollToTop,
  scrollToEnd: windowApi.scrollToBottom
});