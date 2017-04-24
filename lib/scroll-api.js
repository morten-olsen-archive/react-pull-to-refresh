'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultDomEvents = ['scroll', 'touchstart', 'touchmove', 'touchend'];
var publicApi = ['addEventListener', 'removeEventListener', 'triggerEvent', 'getScrollContainer', 'scrollToTop', 'scrollToBottom'];
var bindedApi = ['handleDomEvent'];

var ScrollApi = function () {
  function ScrollApi() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        element = _ref.element,
        _ref$domEvents = _ref.domEvents,
        domEvents = _ref$domEvents === undefined ? defaultDomEvents : _ref$domEvents;

    _classCallCheck(this, ScrollApi);

    this.listeners = {};
    this.domEvents = domEvents;
    if (element) {
      this.setDomElement(element);
    }

    [].concat(publicApi, bindedApi).forEach(function (key) {
      _this[key] = _this[key].bind(_this);
    });
  }

  _createClass(ScrollApi, [{
    key: 'setDomElement',
    value: function setDomElement(element) {
      var _this2 = this;

      this.element = element;
      Object.keys(this.listeners).forEach(function (name) {
        if (_this2.domEvents.includes(name)) {
          _this2.element.addEventListener(name, _this2.handleDomEvent);
        }
      });
    }
  }, {
    key: 'getEvents',
    value: function getEvents(name) {
      if (!this.listeners[name]) {
        this.listeners[name] = [];
        if (this.domEvents.includes(name)) {
          this.element.addEventListener(name, this.handleDomEvent);
        }
      }
      return this.listeners[name];
    }
  }, {
    key: 'disconnectDom',
    value: function disconnectDom() {
      var _this3 = this;

      if (this.element) {
        Object.keys(this.listeners).forEach(function (name) {
          if (_this3.domEvents.includes(name)) {
            _this3.element.removeEventListener(name, _this3.handleDomEvent);
          }
        });
      }
    }
  }, {
    key: 'scrollToTop',
    value: function scrollToTop() {
      var node = this.getScrollContainer();
      node.scrollTop = 0;
      this.triggerEvent('scroll', {});
    }
  }, {
    key: 'scrollToBottom',
    value: function scrollToBottom() {
      var node = this.getScrollContainer();
      node.scrollTop = node.scrollHeight;
      this.triggerEvent('scroll', {});
    }
  }, {
    key: 'scrollToY',
    value: function scrollToY(y) {
      var node = this.getScrollContainer();
      node.scrollTop = y;
      this.triggerEvent('scroll', {});
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener(name, fn) {
      this.getEvents(name).push(fn);
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(name, fn) {
      this.getEvents(name).remove(fn);
    }
  }, {
    key: 'triggerEvent',
    value: function triggerEvent(name, evt) {
      this.getEvents(name).forEach(function (fn) {
        return fn(evt);
      });
    }
  }, {
    key: 'handleDomEvent',
    value: function handleDomEvent(evt) {
      this.triggerEvent(evt.type, evt);
    }
  }, {
    key: 'getScrollContainer',
    value: function getScrollContainer() {
      return this.element;
    }
  }, {
    key: 'getDistanceToBottom',
    value: function getDistanceToBottom(outerHeight) {
      var node = this.getScrollContainer();
      var currentLocation = node.scrollTop + (outerHeight || node.offsetHeight);
      var actualEnd = node.scrollHeight;
      return actualEnd - currentLocation;
    }
  }, {
    key: 'getDistanceToTop',
    value: function getDistanceToTop() {
      var node = this.getScrollContainer();
      return node.scrollTop;
    }
  }, {
    key: 'getPublicApi',
    value: function getPublicApi() {
      var _this4 = this;

      var baseApi = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return publicApi.reduce(function (output, key) {
        output[key] = _this4[key];
        return output;
      }, baseApi);
    }
  }]);

  return ScrollApi;
}();

exports.default = ScrollApi;