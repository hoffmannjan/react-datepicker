'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _popper_component = require('./popper_component');

var _popper_component2 = _interopRequireDefault(_popper_component);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _date_utils = require('./date_utils');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var outsideClickIgnoreClass = 'react-datepicker-ignore-onclickoutside';
var WrappedCalendar = (0, _reactOnclickoutside2.default)(_calendar2.default);

/**
 * General datepicker component.
 */

var DatePicker = function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  _createClass(DatePicker, null, [{
    key: 'defaultProps',
    get: function get() {
      return {
        allowSameDay: false,
        dateFormat: 'L',
        dateFormatCalendar: 'MMMM YYYY',
        onChange: function onChange() {},

        disabled: false,
        disabledKeyboardNavigation: false,
        dropdownMode: 'scroll',
        onFocus: function onFocus() {},
        onBlur: function onBlur() {},
        onKeyDown: function onKeyDown() {},
        onSelect: function onSelect() {},
        onClickOutside: function onClickOutside() {},
        onMonthChange: function onMonthChange() {},

        utcOffset: (0, _moment2.default)().utcOffset(),
        monthsShown: 1,
        withPortal: false,
        shouldCloseOnSelect: true,
        showTimeSelect: false,
        timeIntervals: 30
      };
    }
  }]);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

    _this.getPreSelection = function () {
      return _this.props.openToDate ? (0, _moment2.default)(_this.props.openToDate) : _this.props.selectsEnd && _this.props.startDate ? (0, _moment2.default)(_this.props.startDate) : _this.props.selectsStart && _this.props.endDate ? (0, _moment2.default)(_this.props.endDate) : typeof _this.props.utcOffset !== 'undefined' ? _moment2.default.utc().utcOffset(_this.props.utcOffset) : (0, _moment2.default)();
    };

    _this.calcInitialState = function () {
      var defaultPreSelection = _this.getPreSelection();
      var minDate = (0, _date_utils.getEffectiveMinDate)(_this.props);
      var maxDate = (0, _date_utils.getEffectiveMaxDate)(_this.props);
      var boundedPreSelection = minDate && defaultPreSelection.isBefore(minDate) ? minDate : maxDate && defaultPreSelection.isAfter(maxDate) ? maxDate : defaultPreSelection;

      return {
        open: false,
        preventFocus: false,
        preSelection: _this.props.selected ? (0, _moment2.default)(_this.props.selected) : boundedPreSelection
      };
    };

    _this.clearPreventFocusTimeout = function () {
      if (_this.preventFocusTimeout) {
        clearTimeout(_this.preventFocusTimeout);
      }
    };

    _this.setFocus = function () {
      _this.input.focus();
    };

    _this.setOpen = function (open) {
      _this.setState({
        open: open,
        preSelection: open && _this.state.open ? _this.state.preSelection : _this.calcInitialState().preSelection
      });
    };

    _this.handleFocus = function (event) {
      if (!_this.state.preventFocus) {
        _this.props.onFocus(event);
        _this.setOpen(true);
      }
    };

    _this.cancelFocusInput = function () {
      clearTimeout(_this.inputFocusTimeout);
      _this.inputFocusTimeout = null;
    };

    _this.deferFocusInput = function () {
      _this.cancelFocusInput();
      _this.inputFocusTimeout = setTimeout(function () {
        return _this.setFocus();
      }, 1);
    };

    _this.handleDropdownFocus = function () {
      _this.cancelFocusInput();
    };

    _this.handleBlur = function (event) {
      if (_this.state.open) {
        _this.deferFocusInput();
      } else {
        _this.props.onBlur(event);
      }
    };

    _this.handleCalendarClickOutside = function (event) {
      if (!_this.props.inline) {
        _this.setOpen(false);
      }
      _this.props.onClickOutside(event);
      if (_this.props.withPortal) {
        event.preventDefault();
      }
    };

    _this.handleChange = function (event) {
      if (_this.props.onChangeRaw) {
        _this.props.onChangeRaw(event);
        if (event.isDefaultPrevented()) {
          return;
        }
      }
      _this.setState({ inputValue: event.target.value });
      var date = (0, _date_utils.parseDate)(event.target.value, _this.props);
      if (date || !event.target.value) {
        _this.setSelected(date, event, true);
      }
    };

    _this.handleSelect = function (date, event) {
      // Preventing onFocus event to fix issue
      // https://github.com/Hacker0x01/react-datepicker/issues/628
      _this.setState({ preventFocus: true }, function () {
        _this.preventFocusTimeout = setTimeout(function () {
          return _this.setState({ preventFocus: false });
        }, 50);
        return _this.preventFocusTimeout;
      });
      _this.setSelected(date, event);
      if (!_this.props.shouldCloseOnSelect) {
        _this.setPreSelection(date);
      } else if (!_this.props.inline) {
        _this.setOpen(false);
      }
    };

    _this.setSelected = function (date, event, keepInput) {
      var changedDate = date;

      if (changedDate !== null && (0, _date_utils.isDayDisabled)(changedDate, _this.props)) {
        return;
      }

      if (!(0, _date_utils.isSameDay)(_this.props.selected, changedDate) || _this.props.allowSameDay) {
        if (changedDate !== null) {
          if (_this.props.selected) {
            changedDate = (0, _moment2.default)(changedDate).set({
              hour: _this.props.selected.hour(),
              minute: _this.props.selected.minute(),
              second: _this.props.selected.second()
            });
          }
          _this.setState({
            preSelection: changedDate
          });
        }
        _this.props.onChange(changedDate, event);
      }

      _this.props.onSelect(changedDate, event);

      if (!keepInput) {
        _this.setState({ inputValue: null });
      }
    };

    _this.setPreSelection = function (date) {
      var isDateRangePresent = typeof _this.props.minDate !== 'undefined' && typeof _this.props.maxDate !== 'undefined';
      var isValidDateSelection = isDateRangePresent && date ? (0, _date_utils.isDayInRange)(date, _this.props.minDate, _this.props.maxDate) : true;
      if (isValidDateSelection) {
        _this.setState({
          preSelection: date
        });
      }
    };

    _this.handleTimeChange = function (time) {
      var selected = _this.props.selected ? _this.props.selected : _this.getPreSelection();
      var changedDate = selected.clone().set({
        hour: time.get('hours'),
        minute: time.get('minutes')
      });

      _this.setState({
        preSelection: changedDate
      });

      _this.props.onChange(changedDate);
    };

    _this.onInputClick = function () {
      if (!_this.props.disabled) {
        _this.setOpen(true);
      }
    };

    _this.onInputKeyDown = function (event) {
      _this.props.onKeyDown(event);
      var eventKey = event.key;
      if (!_this.state.open && !_this.props.inline) {
        if (eventKey !== 'Enter' && eventKey !== 'Escape' && eventKey !== 'Tab') {
          _this.onInputClick();
        }
        return;
      }
      var copy = (0, _moment2.default)(_this.state.preSelection);
      if (eventKey === 'Enter') {
        event.preventDefault();
        if (_moment2.default.isMoment(_this.state.preSelection) || _moment2.default.isDate(_this.state.preSelection)) {
          _this.handleSelect(copy, event);
          !_this.props.shouldCloseOnSelect && _this.setPreSelection(copy);
        } else {
          _this.setOpen(false);
        }
      } else if (eventKey === 'Escape') {
        event.preventDefault();
        _this.setOpen(false);
      } else if (eventKey === 'Tab') {
        _this.setOpen(false);
      } else if (!_this.props.disabledKeyboardNavigation) {
        var newSelection = void 0;
        switch (eventKey) {
          case 'ArrowLeft':
            event.preventDefault();
            newSelection = copy.subtract(1, 'days');
            break;
          case 'ArrowRight':
            event.preventDefault();
            newSelection = copy.add(1, 'days');
            break;
          case 'ArrowUp':
            event.preventDefault();
            newSelection = copy.subtract(1, 'weeks');
            break;
          case 'ArrowDown':
            event.preventDefault();
            newSelection = copy.add(1, 'weeks');
            break;
          case 'PageUp':
            event.preventDefault();
            newSelection = copy.subtract(1, 'months');
            break;
          case 'PageDown':
            event.preventDefault();
            newSelection = copy.add(1, 'months');
            break;
          case 'Home':
            event.preventDefault();
            newSelection = copy.subtract(1, 'years');
            break;
          case 'End':
            event.preventDefault();
            newSelection = copy.add(1, 'years');
            break;
        }
        _this.setPreSelection(newSelection);
      }
    };

    _this.onClearClick = function (event) {
      event.preventDefault();
      _this.props.onChange(null, event);
    };

    _this.renderCalendar = function () {
      if (!_this.props.inline && (!_this.state.open || _this.props.disabled)) {
        return null;
      }
      return _react2.default.createElement(
        WrappedCalendar,
        {
          ref: function ref(elem) {
            _this.calendar = elem;
          },
          locale: _this.props.locale,
          dateFormat: _this.props.dateFormatCalendar,
          useWeekdaysShort: _this.props.useWeekdaysShort,
          dropdownMode: _this.props.dropdownMode,
          selected: _this.props.selected,
          preSelection: _this.state.preSelection,
          onSelect: _this.handleSelect,
          onWeekSelect: _this.props.onWeekSelect,
          openToDate: _this.props.openToDate,
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          selectsStart: _this.props.selectsStart,
          selectsEnd: _this.props.selectsEnd,
          startDate: _this.props.startDate,
          endDate: _this.props.endDate,
          excludeDates: _this.props.excludeDates,
          filterDate: _this.props.filterDate,
          onClickOutside: _this.handleCalendarClickOutside,
          formatWeekNumber: _this.props.formatWeekNumber,
          highlightDates: _this.props.highlightDates,
          includeDates: _this.props.includeDates,
          inline: _this.props.inline,
          peekNextMonth: _this.props.peekNextMonth,
          showMonthDropdown: _this.props.showMonthDropdown,
          showWeekNumbers: _this.props.showWeekNumbers,
          showYearDropdown: _this.props.showYearDropdown,
          withPortal: _this.props.withPortal,
          forceShowMonthNavigation: _this.props.forceShowMonthNavigation,
          scrollableYearDropdown: _this.props.scrollableYearDropdown,
          todayButton: _this.props.todayButton,
          weekLabel: _this.props.weekLabel,
          utcOffset: _this.props.utcOffset,
          outsideClickIgnoreClass: outsideClickIgnoreClass,
          fixedHeight: _this.props.fixedHeight,
          monthsShown: _this.props.monthsShown,
          onDropdownFocus: _this.handleDropdownFocus,
          onMonthChange: _this.props.onMonthChange,
          dayClassName: _this.props.dayClassName,
          showTimeSelect: _this.props.showTimeSelect,
          onTimeChange: _this.handleTimeChange,
          timeFormat: _this.props.timeFormat,
          timeIntervals: _this.props.timeIntervals,
          minTime: _this.props.minTime,
          maxTime: _this.props.maxTime,
          excludeTimes: _this.props.excludeTimes,
          className: _this.props.calendarClassName,
          yearDropdownItemNumber: _this.props.yearDropdownItemNumber },
        _this.props.children
      );
    };

    _this.renderDateInput = function () {
      var className = (0, _classnames3.default)(_this.props.className, _defineProperty({}, outsideClickIgnoreClass, _this.state.open));

      var customInput = _this.props.customInput || _react2.default.createElement('input', { type: 'text' });
      var inputValue = typeof _this.props.value === 'string' ? _this.props.value : typeof _this.state.inputValue === 'string' ? _this.state.inputValue : (0, _date_utils.safeDateFormat)(_this.props.selected, _this.props);

      return _react2.default.cloneElement(customInput, {
        ref: function ref(input) {
          _this.input = input;
        },
        value: inputValue,
        onBlur: _this.handleBlur,
        onChange: _this.handleChange,
        onClick: _this.onInputClick,
        onFocus: _this.handleFocus,
        onKeyDown: _this.onInputKeyDown,
        id: _this.props.id,
        name: _this.props.name,
        autoFocus: _this.props.autoFocus,
        placeholder: _this.props.placeholderText,
        disabled: _this.props.disabled,
        autoComplete: _this.props.autoComplete,
        className: className,
        title: _this.props.title,
        readOnly: _this.props.readOnly,
        required: _this.props.required,
        tabIndex: _this.props.tabIndex
      });
    };

    _this.renderClearButton = function () {
      if (_this.props.isClearable && _this.props.selected != null) {
        return _react2.default.createElement('a', { className: 'react-datepicker__close-icon', href: '#', onClick: _this.onClearClick });
      } else {
        return null;
      }
    };

    _this.state = _this.calcInitialState();
    return _this;
  }

  _createClass(DatePicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var currentMonth = this.props.selected && this.props.selected.month();
      var nextMonth = nextProps.selected && nextProps.selected.month();
      if (this.props.inline && currentMonth !== nextMonth) {
        this.setPreSelection(nextProps.selected);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearPreventFocusTimeout();
    }
  }, {
    key: 'render',
    value: function render() {
      var calendar = this.renderCalendar();

      if (this.props.inline && !this.props.withPortal) {
        return calendar;
      }

      if (this.props.withPortal) {
        return _react2.default.createElement(
          'div',
          null,
          !this.props.inline ? _react2.default.createElement(
            'div',
            { className: 'react-datepicker__input-container' },
            this.renderDateInput(),
            this.renderClearButton()
          ) : null,
          this.state.open || this.props.inline ? _react2.default.createElement(
            'div',
            { className: 'react-datepicker__portal' },
            calendar
          ) : null
        );
      }

      return _react2.default.createElement(_popper_component2.default, {
        className: this.props.popperClassName,
        hidePopper: !this.state.open || this.props.disabled,
        popperModifiers: this.props.popperModifiers,
        targetComponent: _react2.default.createElement(
          'div',
          { className: 'react-datepicker__input-container' },
          this.renderDateInput(),
          this.renderClearButton()
        ),
        popperComponent: calendar,
        popperPlacement: this.props.popperPlacement });
    }
  }]);

  return DatePicker;
}(_react2.default.Component);

DatePicker.propTypes = {
  allowSameDay: _propTypes2.default.bool,
  autoComplete: _propTypes2.default.string,
  autoFocus: _propTypes2.default.bool,
  calendarClassName: _propTypes2.default.string,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  customInput: _propTypes2.default.element,
  dateFormat: _propTypes2.default.oneOfType([// eslint-disable-line react/no-unused-prop-types
  _propTypes2.default.string, _propTypes2.default.array]),
  dateFormatCalendar: _propTypes2.default.string,
  dayClassName: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  disabledKeyboardNavigation: _propTypes2.default.bool,
  dropdownMode: _propTypes2.default.oneOf(['scroll', 'select']).isRequired,
  endDate: _propTypes2.default.object,
  excludeDates: _propTypes2.default.array,
  filterDate: _propTypes2.default.func,
  fixedHeight: _propTypes2.default.bool,
  formatWeekNumber: _propTypes2.default.func,
  highlightDates: _propTypes2.default.array,
  id: _propTypes2.default.string,
  includeDates: _propTypes2.default.array,
  inline: _propTypes2.default.bool,
  isClearable: _propTypes2.default.bool,
  locale: _propTypes2.default.string,
  maxDate: _propTypes2.default.object,
  minDate: _propTypes2.default.object,
  monthsShown: _propTypes2.default.number,
  name: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func.isRequired,
  onSelect: _propTypes2.default.func,
  onWeekSelect: _propTypes2.default.func,
  onClickOutside: _propTypes2.default.func,
  onChangeRaw: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onMonthChange: _propTypes2.default.func,
  openToDate: _propTypes2.default.object,
  peekNextMonth: _propTypes2.default.bool,
  placeholderText: _propTypes2.default.string,
  popperClassName: _propTypes2.default.string, // <PopperComponent/> props
  popperModifiers: _propTypes2.default.object, // <PopperComponent/> props
  popperPlacement: _propTypes2.default.oneOf(_popper_component.popperPlacementPositions), // <PopperComponent/> props
  readOnly: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  scrollableYearDropdown: _propTypes2.default.bool,
  selected: _propTypes2.default.object,
  selectsEnd: _propTypes2.default.bool,
  selectsStart: _propTypes2.default.bool,
  showMonthDropdown: _propTypes2.default.bool,
  showWeekNumbers: _propTypes2.default.bool,
  showYearDropdown: _propTypes2.default.bool,
  forceShowMonthNavigation: _propTypes2.default.bool,
  startDate: _propTypes2.default.object,
  tabIndex: _propTypes2.default.number,
  title: _propTypes2.default.string,
  todayButton: _propTypes2.default.string,
  useWeekdaysShort: _propTypes2.default.bool,
  utcOffset: _propTypes2.default.number,
  value: _propTypes2.default.string,
  weekLabel: _propTypes2.default.string,
  withPortal: _propTypes2.default.bool,
  yearDropdownItemNumber: _propTypes2.default.number,
  shouldCloseOnSelect: _propTypes2.default.bool,
  showTimeSelect: _propTypes2.default.bool,
  timeFormat: _propTypes2.default.string,
  timeIntervals: _propTypes2.default.number,
  minTime: _propTypes2.default.object,
  maxTime: _propTypes2.default.object,
  excludeTimes: _propTypes2.default.array
};
exports.default = DatePicker;
