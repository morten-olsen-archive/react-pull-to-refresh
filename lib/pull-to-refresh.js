'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactScrollView = require('react-scroll-view');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var documentElement = global.document ? global.document.documentElement : null;

var PullToRefresh = function (_Component) {
  _inherits(PullToRefresh, _Component);

  _createClass(PullToRefresh, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        acceptThreshold: _propTypes2.default.number,
        refreshThreshold: _propTypes2.default.number,
        maxPull: _propTypes2.default.number,
        resistance: _propTypes2.default.number,
        scroll: _reactScrollView.scrollApiPropType.isRequired,
        onRefresh: _propTypes2.default.func,
        render: _propTypes2.default.func.isRequired
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        acceptThreshold: 0,
        refreshThreshold: 50,
        maxPull: -1,
        resistance: 4,
        onRefresh: undefined
      };
    }
  }]);

  function PullToRefresh() {
    _classCallCheck(this, PullToRefresh);

    var _this = _possibleConstructorReturn(this, (PullToRefresh.__proto__ || Object.getPrototypeOf(PullToRefresh)).call(this));

    _this.handleTouchStart = _this.handleTouchStart.bind(_this);
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
    _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
    _this.state = {
      height: 0
    };
    return _this;
  }

  _createClass(PullToRefresh, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var scroll = this.props.scroll;

      scroll.addEventListener('touchstart', this.handleTouchStart);
    }
  }, {
    key: 'reversable',
    value: function reversable(n) {
      var scroll = this.props.scroll;

      return scroll.reverse ? -n : n;
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(evt) {
      var _props = this.props,
          scroll = _props.scroll,
          acceptThreshold = _props.acceptThreshold;

      if (scroll.getDistanceToStart() <= acceptThreshold + 1) {
        documentElement.addEventListener('touchmove', this.handleTouchMove, true);
        documentElement.addEventListener('touchend', this.handleTouchEnd, true);
        this.setState({
          initTouchY: evt.touches[0].clientY,
          transition: undefined,
          height: 0
        });
      }
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(evt) {
      var _props2 = this.props,
          acceptThreshold = _props2.acceptThreshold,
          maxPull = _props2.maxPull,
          resistance = _props2.resistance,
          refreshThreshold = _props2.refreshThreshold,
          scroll = _props2.scroll;
      var _state = this.state,
          initTouchY = _state.initTouchY,
          accepted = _state.accepted;

      var dragDistance = this.reversable(evt.touches[0].clientY - initTouchY);
      var height = maxPull ? Math.max(dragDistance / resistance, maxPull) : dragDistance / resistance;
      if (!accepted && dragDistance > acceptThreshold) {
        this.setState({
          accepted: true
        });
        scroll.disableScroll();
        global.document.body.style.overflowScrolling = 'auto';
        global.document.body.style.WebkitOverflowScrolling = 'auto';
      }
      if (this.state.accepted) {
        evt.preventDefault();
        this.setState({
          height: height,
          transition: undefined,
          willRefresh: height > refreshThreshold
        });
      }
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd() {
      var willRefresh = this.state.willRefresh;
      var _props3 = this.props,
          onRefresh = _props3.onRefresh,
          scroll = _props3.scroll;

      documentElement.removeEventListener('touchmove', this.handleTouchMove);
      documentElement.removeEventListener('touchend', this.handleTouchEnd);
      global.document.body.style.overflowScrolling = undefined;
      global.document.body.style.WebkitOverflowScrolling = undefined;
      scroll.enableScroll();
      this.setState({
        initTouchY: undefined,
        accepted: false,
        height: 0,
        transition: '0.5s height'
      });
      if (willRefresh && onRefresh) {
        onRefresh();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          render = _props4.render,
          refreshThreshold = _props4.refreshThreshold,
          scroll = _props4.scroll;
      var _state2 = this.state,
          height = _state2.height,
          transition = _state2.transition;

      var drag = Math.min(height / refreshThreshold, 1);
      return _react2.default.createElement(
        'div',
        {
          style: {
            height: height,
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            transition: transition
          }
        },
        _react2.default.createElement(
          'div',
          {
            style: {
              position: 'absolute',
              bottom: scroll.reverse ? undefined : 0,
              top: scroll.reverse ? 0 : undefined
            }
          },
          render({
            height: height,
            drag: drag
          })
        )
      );
    }
  }]);

  return PullToRefresh;
}(_react.Component);

exports.default = (0, _reactScrollView.withScrollApi)(PullToRefresh);