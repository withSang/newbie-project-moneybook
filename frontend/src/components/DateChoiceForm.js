import React from 'react';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';

function DateChoiceForm ({ startDate, endDate, setStartDate, setEndDate, setExpenseModified }) {
    function handleDateChoice () {
        // console.log("startDate: " + startDate);
        // console.log("endDate: " + endDate);
        setExpenseModified(true);
    };

    return <span>
        <DatePicker
            className = "input-datepicker"
            locale = "ko"
            dateFormat = 'yyyy/MM/dd'
            selected = {startDate}
            onChange = {(selectedDate) => {setStartDate(selectedDate)}}/>
        <DatePicker
            className = "input-datepicker"
            locale = "ko"
            dateFormat = 'yyyy/MM/dd'
            selected = {endDate}
            onChange = {(selectedDate) => {setEndDate(selectedDate)}}/>
        <Button
            variant = "secondary"
            onClick = {handleDateChoice}
        >범위 설정</Button>
    </span>
}

export default DateChoiceForm;