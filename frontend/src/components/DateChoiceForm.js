import React from 'react';
import DatePicker from 'react-datepicker';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function DateChoiceForm ({ startDate, endDate, setStartDate, setEndDate, setExpenseModified, handleDownloadClick }) {
    function handleDateChoice () {
        setExpenseModified(true);
    };

    return <Container fluid>
        <Row>
            <Col xs={2}>시작일</Col>
            <Col xs={2}>종료일</Col>
        </Row>
        <Row>
            <Col xs={2}>
                <DatePicker
                    className = "input-datepicker"
                    locale = "ko"
                    dateFormat = 'yyyy/MM/dd'
                    selected = {startDate}
                    onChange = {(selectedDate) => {setStartDate(selectedDate)}}
                />
            </Col>
            <Col xs={2}>
                <DatePicker
                    className = "input-datepicker"
                    locale = "ko"
                    dateFormat = 'yyyy/MM/dd'
                    selected = {endDate}
                    onChange = {(selectedDate) => {setEndDate(selectedDate)}}
                />
            </Col>
            <Col xs={2}>
                <Button
                    variant = "secondary"
                    onClick = {handleDateChoice}
                >범위 설정</Button>
            </Col>
            <Col xs={2}>
                <Button
                    variant='primary'
                    onClick={ handleDownloadClick }
                >다운로드</Button>
            </Col>


        </Row>
    </Container>
}

export default DateChoiceForm;