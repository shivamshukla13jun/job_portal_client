import React, { useState } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

const DatePicker = ({ value, onChange, label = 'Select Date', id }) => {
    const [focused, setFocused] = useState(false);

    const returnYears = () => {
        const currentYear = moment().year();
        return Array.from({ length: 100 }, (_, i) => (
            <option key={i} value={currentYear - i}>{currentYear - i}</option>
        ));
    };

    const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                <select
                    style={{ padding: '0px', height: 'inherit' }}
                    value={month.month()}
                    onChange={(e) => onMonthSelect(month, e.target.value)}
                >
                    {moment.months().map((label, value) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </div>
            <div>
                <select
                    style={{ padding: '0px', height: 'inherit' }}
                    value={month.year()}
                    onChange={(e) => onYearSelect(month, e.target.value)}
                >
                    {returnYears()}
                </select>
            </div>
        </div>
    );

    return (
        <SingleDatePicker
            id={id}
            date={moment(value)}
            onDateChange={(date) => onChange(date.format())}
            focused={focused}
            onFocusChange={({ focused }) => setFocused(focused)}
            numberOfMonths={1}
            isOutsideRange={() => false}
            displayFormat="DD-MM-YYYY"
            renderMonthElement={renderMonthElement}
            readOnly={true}
        />
    );
};

export default DatePicker;