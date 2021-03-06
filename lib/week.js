'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _day = require('./day');

var _day2 = _interopRequireDefault(_day);

var _week_number = require('./week_number');

var _week_number2 = _interopRequireDefault(_week_number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Week = function (_React$Component) {
  _inherits(Week, _React$Component);

  function Week() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Week);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Week.__proto__ || Object.getPrototypeOf(Week)).call.apply(_ref, [this].concat(args))), _this), _this.handleDayClick = function (day, event) {
      event.preventDefault();
      event.stopPropagation();
      if (_this.props.onDayClick) {
        _this.props.onDayClick(day, event);
      }
    }, _this.handleDayMouseEnter = function (day) {
      event.preventDefault();
      event.stopPropagation();
      if (_this.props.onDayMouseEnter) {
        _this.props.onDayMouseEnter(day);
      }
    }, _this.handleWeekClick = function (day, weekNumber, event) {
      event.preventDefault();
      event.stopPropagation();
      if (typeof _this.props.onWeekSelect === 'function') {
        _this.props.onWeekSelect(day, weekNumber, event);
      }
    }, _this.formatWeekNumber = function (startOfWeek) {
      if (_this.props.formatWeekNumber) {
        return _this.props.formatWeekNumber(startOfWeek);
      }
      return parseInt(startOfWeek.format('w'), 10);
    }, _this.renderDays = function () {
      var startOfWeek = _this.props.day.clone().startOf('week');
      var days = [];
      var weekNumber = _this.formatWeekNumber(startOfWeek);
      if (_this.props.showWeekNumber) {
        var onClickAction = _this.props.onWeekSelect ? _this.handleWeekClick.bind(_this, startOfWeek, weekNumber) : undefined;
        days.push(_react2.default.createElement(_week_number2.default, { key: 'W', weekNumber: weekNumber, onClick: onClickAction }));
      }
      return days.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
        var day = startOfWeek.clone().add(offset, 'days');
        return _react2.default.createElement(_day2.default, {
          key: offset,
          day: day,
          month: _this.props.month,
          onClick: _this.handleDayClick.bind(_this, day),
          onMouseEnter: _this.handleDayMouseEnter.bind(_this, day),
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          excludeDates: _this.props.excludeDates,
          includeDates: _this.props.includeDates,
          inline: _this.props.inline,
          highlightDates: _this.props.highlightDates,
          selectingDate: _this.props.selectingDate,
          filterDate: _this.props.filterDate,
          preSelection: _this.props.preSelection,
          selected: _this.props.selected,
          selectsStart: _this.props.selectsStart,
          selectsEnd: _this.props.selectsEnd,
          startDate: _this.props.startDate,
          endDate: _this.props.endDate,
          dayClassName: _this.props.dayClassName,
          utcOffset: _this.props.utcOffset });
      }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Week, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'react-datepicker__week' },
        this.renderDays()
      );
    }
  }]);

  return Week;
}(_react2.default.Component);

Week.propTypes = {
  day: _propTypes2.default.object.isRequired,
  dayClassName: _propTypes2.default.func,
  endDate: _propTypes2.default.object,
  excludeDates: _propTypes2.default.array,
  filterDate: _propTypes2.default.func,
  formatWeekNumber: _propTypes2.default.func,
  highlightDates: _propTypes2.default.array,
  includeDates: _propTypes2.default.array,
  inline: _propTypes2.default.bool,
  maxDate: _propTypes2.default.object,
  minDate: _propTypes2.default.object,
  month: _propTypes2.default.number,
  onDayClick: _propTypes2.default.func,
  onDayMouseEnter: _propTypes2.default.func,
  onWeekSelect: _propTypes2.default.func,
  preSelection: _propTypes2.default.object,
  selected: _propTypes2.default.object,
  selectingDate: _propTypes2.default.object,
  selectsEnd: _propTypes2.default.bool,
  selectsStart: _propTypes2.default.bool,
  showWeekNumber: _propTypes2.default.bool,
  startDate: _propTypes2.default.object,
  utcOffset: _propTypes2.default.number
};
exports.default = Week;
