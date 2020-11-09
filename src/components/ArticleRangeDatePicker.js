import React from "react";
import { DateRangePicker } from "react-dates";
import PropTypes from "prop-types";
import moment from "moment";
import CalendarIconSrc from "../svgs/calendar.svg";
import InlineSVG from "react-inlinesvg";
import { hasValue } from "../utility-functions/hasValue.func";

const ArticleRangeDatePicker = ({ startDateId, endDateId, onDatesChange }) => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [focusedInput, setFocusedInput] = React.useState(null);

  const handleDateChange = (dateRangeQueryObj) => {
    setStartDate(dateRangeQueryObj.startDate);
    setEndDate(dateRangeQueryObj.endDate);
    onDatesChange(dateRangeQueryObj);
  };

  const clearDates = () => {
    handleDateChange({
      startDate: null,
      endDate: null,
    });
  };

  /**
   *You may be wondering why the selected date range is: (from 1 month before the today's date - today date).
   * the free version of newsapi only allows you to go one month back into the past
   **/
  const currentDate = moment();
  const minDate = moment(currentDate).subtract(1, "M");

  return (
    <div className="date-range-picker">
      <DateRangePicker
        customInputIcon={<InlineSVG src={CalendarIconSrc} />}
        startDate={startDate} // momentPropTypes.momentObj or null,
        startDateId={startDateId} // PropTypes.string.isRequired,
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId={endDateId} // PropTypes.string.isRequired,
        onDatesChange={handleDateChange} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
        startDatePlaceholderText="Filter by start date"
        endDatePlaceholderText="Filter by end date"
        isOutsideRange={(date) =>
          moment(date).isBefore(minDate) || moment(date).isAfter(currentDate)
        }
      />
      <button
        disabled={!hasValue(startDate) && !hasValue(endDate)}
        className="date-range-picker__clear-button"
        type="button"
        onClick={clearDates}
      >
        Clear Dates
      </button>
    </div>
  );
};

ArticleRangeDatePicker.propTypes = {
  startDateId: PropTypes.string.isRequired,
  endDateId: PropTypes.string.isRequired,
  onDatesChange: PropTypes.func.isRequired,
};

export default ArticleRangeDatePicker;
