'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popperPlacementPositions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactPopper = require('react-popper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var popperPlacementPositions = exports.popperPlacementPositions = ['auto', 'auto-left', 'auto-right', 'bottom', 'bottom-end', 'bottom-start', 'left', 'left-end', 'left-start', 'right', 'right-end', 'right-start', 'top', 'top-end', 'top-start'];

var PopperComponent = function (_React$Component) {
  _inherits(PopperComponent, _React$Component);

  function PopperComponent() {
    _classCallCheck(this, PopperComponent);

    return _possibleConstructorReturn(this, (PopperComponent.__proto__ || Object.getPrototypeOf(PopperComponent)).apply(this, arguments));
  }

  _createClass(PopperComponent, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          hidePopper = _props.hidePopper,
          popperComponent = _props.popperComponent,
          popperModifiers = _props.popperModifiers,
          popperPlacement = _props.popperPlacement,
          targetComponent = _props.targetComponent;


      return _react2.default.createElement(
        _reactPopper.Manager,
        null,
        _react2.default.createElement(
          _reactPopper.Target,
          { className: 'react-datepicker-wrapper' },
          targetComponent
        ),
        !hidePopper && _react2.default.createElement(
          _reactPopper.Popper,
          {
            className: 'react-datepicker-popper',
            modifiers: popperModifiers,
            placement: popperPlacement },
          popperComponent
        )
      );
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return {
        hidePopper: true,
        popperModifiers: {
          preventOverflow: {
            enabled: true,
            escapeWithReference: true,
            boundariesElement: 'viewport'
          }
        },
        popperPlacement: 'bottom-start'
      };
    }
  }]);

  return PopperComponent;
}(_react2.default.Component);

PopperComponent.propTypes = {
  hidePopper: _propTypes2.default.bool,
  popperComponent: _propTypes2.default.element,
  popperModifiers: _propTypes2.default.object, // <datepicker/> props
  popperPlacement: _propTypes2.default.oneOf(popperPlacementPositions), // <datepicker/> props
  targetComponent: _propTypes2.default.element
};
exports.default = PopperComponent;
