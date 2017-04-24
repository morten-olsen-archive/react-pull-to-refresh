'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _scrollApi = require('./scroll-api.js');

var _scrollApi2 = _interopRequireDefault(_scrollApi);

var _windowApi = require('./window-api.js');

var _windowApi2 = _interopRequireDefault(_windowApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var scrollContainer = function scrollContainer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === undefined ? false : _ref$reverse;

  return function (WrappedComponent) {
    return function (_Component) {
      _inherits(Scrollable, _Component);

      _createClass(Scrollable, null, [{
        key: 'childContextTypes',
        get: function get() {
          return {
            scroll: _propTypes2.default.object
          };
        }
      }, {
        key: 'propTypes',
        get: function get() {
          return {
            endTriggerDistance: _propTypes2.default.number
          };
        }
      }, {
        key: 'defaultProps',
        get: function get() {
          return {
            endTriggerDistance: 0
          };
        }
      }]);

      function Scrollable() {
        _classCallCheck(this, Scrollable);

        var _this = _possibleConstructorReturn(this, (Scrollable.__proto__ || Object.getPrototypeOf(Scrollable)).call(this));

        _this.api = new _scrollApi2.default();
        _this.scrollToStart = _this.scrollToStart.bind(_this);
        _this.scrollToEnd = _this.scrollToEnd.bind(_this);
        _this.handleAtEnd = _this.handleAtEnd.bind(_this);
        return _this;
      }

      _createClass(Scrollable, [{
        key: 'getChildContext',
        value: function getChildContext() {
          return {
            scroll: this.api.getPublicApi({
              scrollToStart: this.scrollToStart,
              scrollToEnd: this.scrollToEnd,
              parent: this.context.scroll || _windowApi2.default
            })
          };
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          this.api.setDomElement(_reactDom2.default.findDOMNode(this));
          if (reverse) {
            var node = this.api.getScrollContainer();
            this.scrollToStart();
            this.observer = new global.MutationObserver(function () {
              var distanceToEnd = _this2.api.getDistanceToBottom();
              var diff = distanceToEnd - _this2.distanceToEnd;
              node.scrollTop += diff;
              _this2.distanceToEnd = distanceToEnd;
            });
            var config = {
              attributes: true,
              childList: true,
              characterData: true,
              subtree: true
            };
            this.observer.observe(node, config);
          }
          this.api.addEventListener('scroll', this.handleAtEnd);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.isUnmounted = true;
          this.api.disconnectDom();
          this.observer.disconnect();
        }
      }, {
        key: 'scrollToStart',
        value: function scrollToStart() {
          if (reverse) {
            this.api.scrollToBottom();
          } else {
            this.api.scrollToTop();
          }
        }
      }, {
        key: 'scrollToEnd',
        value: function scrollToEnd() {
          if (reverse) {
            this.api.scrollToTop();
          } else {
            this.api.scrollToBottom();
          }
        }
      }, {
        key: 'getDistanceToEnd',
        value: function getDistanceToEnd() {
          if (reverse) {
            return this.api.getDistanceToTop();
          } else {
            return this.api.getDistanceToBottom();
          }
        }
      }, {
        key: 'getDistanceToStart',
        value: function getDistanceToStart() {
          if (reverse) {
            return this.api.getDistanceToBottom();
          } else {
            return this.api.getDistanceToTop();
          }
        }
      }, {
        key: 'handleAtEnd',
        value: function handleAtEnd() {
          var endTriggerDistance = this.props.endTriggerDistance;

          var distanceToEnd = this.getDistanceToEnd();
          this.distanceToEnd = this.api.getDistanceToBottom();
          if (!this.atTheEnd) {
            if (distanceToEnd <= endTriggerDistance) {
              this.api.triggerEvent('onend', {});
              this.atTheEnd = true;
            }
          } else if (distanceToEnd > endTriggerDistance) {
            this.atTheEnd = false;
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.props);
        }
      }]);

      return Scrollable;
    }(_react.Component);
  };
};

exports.default = scrollContainer;