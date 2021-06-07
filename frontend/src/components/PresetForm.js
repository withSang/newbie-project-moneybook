import React, { useState, useEffect } from 'react';
import { checkGenericInput, checkMoney } from '../security/checkInput';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

function PresetForm( {user, setPresetModified, presetToEdit, setPresetToEdit} ) {
    const prevPreset = presetToEdit || {};
    const _id = prevPreset._id || null;
    const userID = user.userID;
    const [name, setName] = useState(prevPreset.name || '');
    const [money, setMoney] = useState(prevPreset.money || 0);
    const [isPositive, setIsPositive] = useState(prevPreset.isPositive || false);
    const [isSchool, setIsSchool] = useState(prevPreset.isSchool || true);

    const [nameWarning, setNameWarning] = useState("");
    const [moneyWarning, setMoneyWarning] = useState("");
    const [buttonText, setButtonText] = useState(presetToEdit ? ("수정") : ("추가"));

    const clearForm = () => {
        setPresetToEdit(null);
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
        
        if (presetToEdit) {
            handleUpdatePreset({_id, userID, name, money, isPositive, isSchool}, ()=>{
                clearForm();
                setPresetModified(true);
                return;
            });
        } else {
            handleAddPreset({_id, userID, name, money, isPositive, isSchool}, ()=>{
                clearForm();
                setPresetModified(true);
                return;
            });
        }
        return;
    }

    const handleAddPreset = ({userID, name, money, isPositive, isSchool}, callback) => {
        axios.post('/api/preset/add', {
            userID,
            name,
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

    const handleUpdatePreset = ({_id, userID, name, money, isPositive, isSchool}, callback) => {
        axios.post('/api/preset/update', {
            _id,
            userID,
            name,
            money,
            isPositive,
            isSchool
        }).then((result) => {
            if (result) {
                alert('수정되었습니다.');
                setPresetToEdit(null);
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
        //수정 모드에 들어왔을 때, date, name, money, isPositive, isSchool 값을 바탕으로 입력창의 값을 새롭게 설정한다.
        if (presetToEdit) {
            setName(presetToEdit.name);
            setMoney(presetToEdit.money);
            setIsPositive(presetToEdit.isPositive);
            setIsSchool(presetToEdit.isSchool);
            setButtonText(presetToEdit ? ("수정") : ("추가"));
        }
    }, [presetToEdit]);

    return (
        <div>
            <Form.Group>
                <Form.Row>
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
    )

}

export default PresetForm;