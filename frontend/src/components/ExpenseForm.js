import React, { useState, useEffect } from 'react';
import { checkGenericInput, checkMoney } from '../security/checkInput';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import axios from 'axios';


function ExpenseForm ( {user, setExpenseModified, expenseToEdit, setExpenseToEdit, presets} ) {
    const prevExpense = expenseToEdit || {};
    const _id = prevExpense._id || null;
    const userID = user.userID;
    const [date, setDate] = useState(new Date(prevExpense.date || new Date()) );
    const [name, setName] = useState(prevExpense.name || '');
    const [money, setMoney] = useState(prevExpense.money || 0);
    const [isPositive, setIsPositive] = useState(prevExpense.isPositive || false);
    const [isSchool, setIsSchool] = useState(prevExpense.isSchool || true);

    const [nameWarning, setNameWarning] = useState("");
    const [moneyWarning, setMoneyWarning] = useState("");
    const [buttonText, setButtonText] = useState(expenseToEdit ? ("수정") : ("추가"));


    registerLocale('ko', ko);

    const clearForm = () => {
        setExpenseToEdit(null);
        setDate(new Date());
        setName('')
        setMoney(0);
        setIsPositive(false);
        setIsSchool(true);
        setButtonText("추가");
        setNameWarning("");
        setMoneyWarning("");
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
        
        if (expenseToEdit) {
            handleUpdateExpense({_id, userID, name, date, money, isPositive, isSchool}, ()=>{
                clearForm();
                setExpenseModified(true);
                return;
            });
        } else {
            handleAddExpense({_id, userID, name, date, money, isPositive, isSchool}, ()=>{
                clearForm();
                setExpenseModified(true);
                return;
            });
        }
        return;
    }

    const handleAddExpense = ({userID, name, date, money, isPositive, isSchool}, callback) => {
        axios.post('/api/expense/add', {
            userID,
            name,
            date,
            money,
            isPositive,
            isSchool
        }).then((result) => {
            if (result) {
                alert('추가되었습니다.');
                callback();
            } else {
                alert('오류가 발생했습니다. 나중에 다시 시도해주세요.')
            }
        }).catch((error) => {
            alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
        })
    };

    const handleUpdateExpense = ({_id, userID, name, date, money, isPositive, isSchool}, callback) => {
        axios.post('/api/expense/update', {
            _id,
            userID,
            name,
            date,
            money,
            isPositive,
            isSchool
        }).then((result) => {
            if (result) {
                alert('수정되었습니다.');
                setExpenseToEdit(null);
                callback();
            } else {
                alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
            }
        }).catch((error) => {
            alert(error);
            alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
        })
    };

    useEffect(()=>{
        //date, name, money, isPositive, isSchool 값을 바탕으로 입력창의 값을 새롭게 설정한다.
        if (expenseToEdit) {
            setDate(new Date(expenseToEdit.date));
            setName(expenseToEdit.name);
            setMoney(expenseToEdit.money);
            setIsPositive(expenseToEdit.isPositive);
            setIsSchool(expenseToEdit.isSchool);
            setButtonText(expenseToEdit ? ("수정") : ("추가"));
        }
    }, [expenseToEdit]);

    const handleNameOnSearch = (string, results) => {
        //string: 현재 검색창에 넣은 단어
        //results: 매칭된 단어 (매칭되지 않는 단어도 섞이는 것 같다)
        setName(string);
    }

    const handleNameOnSelect = (result) => {
        //검색창에 있는 프리셋 중 하나를 클릭했을 때 반응.
        const presetToApply = presets[result.id]
        setName(presetToApply.name);
        setMoney(presetToApply.money);
        setIsPositive(presetToApply.isPositive);
        setIsSchool(presetToApply.isSchool);
    }

    return (
        <div>
            <Form.Group>
                <Form.Row>
                    <Col xs={2}>
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
                    <Col xs={1}>
                        <Form.Label>교내/교외</Form.Label>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs={2}>
                        <DatePicker
                            className="input-datepicker"
                            locale = 'ko'
                            dateFormat = 'yyyy/MM/dd'
                            selected = {date}
                            onChange = {(selectedDate) => {setDate(selectedDate)}}
                        />
                    </Col>
                    <Col xs={2}>
                        {/* <Form.Control
                            value = {name}
                            onChange = {({ target : { value }}) => setName(value)}
                            type = "text"
                            placeholder = "항목명"
                        /> */}
                        <ReactSearchAutocomplete
                            items = {presets.map((item, index)=>{return {id:index, name:item.name}})}
                            showIcon={false}
                            styling={{
                                borderRadius: "3px",
                                height: "36px"
                            }}
                            inputSearchString={name}
                            onSearch={handleNameOnSearch}
                            onSelect={handleNameOnSelect}
                            
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
                            checked={ isPositive }
                            onChange = {({ target : { checked }}) => setIsPositive(checked)}
                        />
                    </Col>
                    <Col xs={1}>
                        <Form.Control
                            as="select"
                            onChange = {({ target : { value }}) => {setIsSchool(value === '교내')}}
                            value = { isSchool ? ("교내") : ("교외") }
                            type = "text"
                        >
                            <option value="교내">교내</option>
                            <option value="교외">교외</option>
                        </Form.Control>
                    </Col>
                    <Button variant="primary" onClick={handleSubmit}>{buttonText}</Button>
                    <Button variant="danger" onClick={clearForm}>취소</Button>
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