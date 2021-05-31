import React, { useState, useEffect } from 'react';
import { checkGenericInput, checkMoney } from '../security/checkInput';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import axios from 'axios';

function ExpenseForm ( {user, setExpenseModified} ) {
    const userID = user.userID;
    const [name, setName] = useState('');
    const [nameWarning, setNameWarning] = useState("");
    const [date, setDate] = useState(new Date());
    const [money, setMoney] = useState(0);
    const [moneyWarning, setMoneyWarning] = useState("");
    const [isPositive, setIsPositive] = useState(false);
    const [isSchool, setIsSchool] = useState(true);

    registerLocale('ko', ko);

    const clearForm = () => {
        setDate(new Date());
        setName("")
        setMoney(0);
        setIsPositive(false);
        setIsSchool(true);
    }

    const handleSubmit = () => {
        let wrongInput = false;
        if ( !checkGenericInput(name) ) {
            wrongInput = true;
            setNameWarning("항목명은 한글, 영어 대소문자, 숫자와 공백만을 포함해야 합니다.");
        } else {
            setNameWarning("");
        }
        if ( !checkMoney(money) ) {
            wrongInput = true;
            setMoneyWarning("유효하지 않은 숫자입니다.");
        } else {
            setMoneyWarning("");
        }
        if (wrongInput) {
            return;
        }
        axios.post('/api/expense/add', {
            userID,
            name,
            date,
            money,
            isPositive,
            isSchool
        }).then((result) => {
            if (result) {
                alert(date);
                alert('추가되었습니다.');
                clearForm();
                setExpenseModified(true);
            } else {
                alert('오류가 발생했습니다. 나중에 다시 시도해주세요.')
            }
        }).catch((error) => {
            alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
        })
    }

    return (
        <div>
            <h2>항목 추가하기</h2>
            <Form.Group>
                <Form.Row>
                    <Col xs={3}>
                        <Form.Label>날짜</Form.Label>
                    </Col>
                    <Col xs={2}>
                        <Form.Label>항목명</Form.Label>
                    </Col>
                    <Col xs={2}>
                        <Form.Label>금액</Form.Label>
                    </Col>
                    <Col xs={1}>
                        <Form.Label>수입</Form.Label>
                    </Col>
                    <Col xs={2}>
                        <Form.Label>교내/교외</Form.Label>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs={3}>
                        <DatePicker
                            locale = 'ko'
                            dateFormat = 'yyyy/MM/dd'
                            selected = {date}
                            onChange = {(selectedDate) => {setDate(selectedDate)}}
                        />
                    </Col>
                    <Col xs={2}>
                        <Form.Control
                            value = {name}
                            onChange = {({ target : { value }}) => setName(value)}
                            type = "text"
                            placeholder = "항목명"
                        />
                    </Col>
                    <Col xs={2}>
                        <Form.Control
                            value = {money}
                            onChange = {({ target : { value }}) => setMoney(value)}
                            type = "text"
                            placeholder = "금액"
                        />
                    </Col>
                    <Col xs={1}>
                        <Form.Check
                            onChange = {({ target : { checked }}) => setIsPositive(checked)}
                        />
                    </Col>
                    <Col xs={2}>
                        <Form.Control
                            as = "select"
                            onChange = {({ target : { value }}) => setIsSchool(value === 'true')}
                            type = "text"
                            placeholder = "교내/교외"
                        >
                            <option value="true">교내</option>
                            <option value="false">교외</option>
                        </Form.Control>
                    </Col>
                    <Button variant="primary" onClick={handleSubmit}>저장</Button>
                </Form.Row>
                {nameWarning ? (
                    <Alert variant="danger">{nameWarning}</Alert>
                ) : (null)}
                {moneyWarning ? (
                    <Alert variant="danger">{moneyWarning}</Alert>
                ) : (null)}
            </Form.Group>
        </div>
    );
};

export default ExpenseForm;