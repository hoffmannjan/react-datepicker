'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _date_utils = require('./date_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Time = function (_React$Component) {
  _inherits(Time, _React$Component);

  function Time() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Time);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Time.__proto__ || Object.getPrototypeOf(Time)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (time, event) {
      event.preventDefault();
      event.stopPropagation();
      if ((_this.props.minTime || _this.props.maxTime) && (0, _date_utils.isTimeInDisabledRange)(time, _this.props) || _this.props.excludeTimes && (0, _date_utils.isTimeDisabled)(time, _this.props.excludeTimes)) {
        return;
      }

      _this.props.onChange(time);
    }, _this.liClasses = function (time, currH, currM) {
      var classes = ['react-datepicker__time-list-item'];

      if (currH === time.get('hours') && currM === time.get('minutes')) {
        classes.push('react-datepicker__time-list-item--selected');
      }
      if ((_this.props.minTime || _this.props.maxTime) && (0, _date_utils.isTimeInDisabledRange)(time, _this.props) || _this.props.excludeTimes && (0, _date_utils.isTimeDisabled)(time, _this.props.excludeTimes)) {
        classes.push('react-datepicker__time-list-item--disabled');
      }

      return classes.join(' ');
    }, _this.renderTimes = function () {
      var times = [];
      var format = _this.props.format ? _this.props.format : 'hh:mm A';
      var intervals = _this.props.intervals;
      var activeTime = _this.props.selected ? _this.props.selected : (0, _moment2.default)();
      var currH = activeTime.get('hours');
      var currM = activeTime.get('minutes');
      var base = (0, _moment2.default)().startOf('day');
      var multiplier = 1440 / intervals;
      for (var i = 0; i < multiplier; i++) {
        times.push(base.clone().add(i * intervals, 'minutes'));
      }

      return times.map(function (time, i) {
        return _react2.default.createElement(
          'li',
          { key: i, onClick: _this.handleClick.bind(_this, time), className: _this.liClasses(time, currH, currM) },
          time.format(format)
        );
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Time, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // code to ensure selected time will always be in focus within time window when it first appears
      var multiplier = 60 / this.props.intervals;
      var currH = this.props.selected ? this.props.selected.get('hours') : (0, _moment2.default)().get('hours');
      this.list.scrollTop = 30 * (multiplier * currH);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var height = null;
      if (this.props.monthRef) {
        height = this.props.monthRef.clientHeight - 39;
      }

      return _react2.default.createElement(
        'div',
        { className: 'react-datepicker__time-container ' + (this.props.todayButton ? 'react-datepicker__time-container--with-today-button' : '') },
        _react2.default.createElement(
          'div',
          { className: 'react-datepicker__header react-datepicker__header--time' },
          _react2.default.createElement(
            'div',
            { className: 'react-datepicker-time__header' },
            'Time'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'react-datepicker__time' },
          _react2.default.createElement(
            'div',
            { className: 'react-datepicker__time-box' },
            _react2.default.createElement(
              'ul',
              { className: 'react-datepicker__time-list', ref: function ref(list) {
                  _this2.list = list;
                }, style: height ? { height: height } : {} },
              this.renderTimes.bind(this)()
            )
          )
        )
      );
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return {
        intervals: 30,
        onTimeChange: function onTimeChange() {},
        todayButton: null
      };
    }
  }]);

  return Time;
}(_react2.default.Component);

Time.propTypes = {
  format: _propTypes2.default.string,
  intervals: _propTypes2.default.number,
  selected: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  todayButton: _propTypes2.default.string,
  minTime: _propTypes2.default.object,
  maxTime: _propTypes2.default.object,
  excludeTimes: _propTypes2.default.array,
  monthRef: _propTypes2.default.object
};
exports.default = Time;
