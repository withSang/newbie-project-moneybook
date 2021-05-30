import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { checkName, checkUserID, checkPassword } from '../security/checkInput';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function RegisterForm() {
    const [ name, setName ] = useState("");
    const [ nameWarning, setNameWarning ] = useState("");
    const [ userID, setUserID ] = useState("");
    const [ userIDWarning, setUserIDWarning ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordWarning, setPasswordWarning ] = useState("");

    const history = useHistory();

    const checkUserIDIsUnique = (userID, callback) => {
        axios.post("api/user/signup/checkid", {userID})
        .then((response) => {
            callback();
        }).catch((error) => {
            alert('중복된 아이디입니다.')
        })
    }

    const handleSubmit = () => {
        let wrongInput = false;
        if (!checkName(name)) {
            setNameWarning('이름은 한글, 알파벳 대소문자, 숫자로만 1~12자로 구성되어야 합니다.');
            wrongInput = true;
        } else {
            setNameWarning('');
        }
        if (!checkUserID(userID)) {
            setUserIDWarning('아이디는 숫자, 알파벳 대소문자로 4~12자로 구성되어야 합니다.');
            wrongInput = true;
        } else {
            setUserIDWarning('');
        }
        if (!checkPassword(password)) {
            setPasswordWarning('비밀번호는 숫자, 알파벳 대소문자로 8~50자로 구성되어야 합니다.');
            wrongInput = true;
        } else {
            setPasswordWarning('');
        }
        if (wrongInput) {
            return;
        }
        axios.post("api/user/signup", {name, userID, password})
        .then((response) => {
            const user = response.data;
            if (user) {
                alert('회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.')
                history.push('/login');
            }
        })
    };

    return (
        <div>
            <h1>회원가입 페이지</h1>
            <Form.Group>
                <Form.Row>
                    <Col xs={1}>
                        <Form.Label>이름</Form.Label>
                    </Col>
                    <Col xs={2}>
                        <input
                            value = {name}
                            onChange = {({ target : { value } }) => setName(value)}
                            type = "text"
                            placeholder = "이름"
                        />
                    </Col>
                    { nameWarning ? (
                            <Col xs={3}>
                                <Alert variant="danger">{nameWarning}</Alert>
                            </Col>
                        ) : (
                            null
                        )
                    }
                </Form.Row>
                <Form.Row>
                    <Col xs={1}>
                        <Form.Label>아이디</Form.Label>
                    </Col>
                    <Col xs={2}>
                        <input
                            value = {userID}
                            onChange = {({ target : { value } }) => setUserID(value)}
                            type = "text"
                            placeholder = "아이디"
                        />
                    </Col>
                    <Col xs={2}>
                        <Button variant="info" onClick={() => {checkUserIDIsUnique(userID, ()=>{alert('사용 가능한 아이디입니다.')})}}>아이디 중복 확인</Button>
                    </Col>
                    { userIDWarning ? (
                            <Col xs={3}>
                                <Alert variant="danger">{userIDWarning}</Alert>
                            </Col>
                        ) : (
                            null
                        )
                    }                 
                </Form.Row>
                <Form.Row>
                    <Col xs={1}>
                        <Form.Label>비밀번호</Form.Label>
                    </Col>
                    <Col xs={2}>
                        <input
                            value = {password}
                            onChange = {({ target : { value } }) => setPassword(value)}
                            type = "password"
                            placeholder = "비밀번호"
                        />
                    </Col>
                    { passwordWarning ? (
                            <Col xs={3}>
                                <Alert variant="danger">{passwordWarning}</Alert>
                            </Col>
                        ) : (
                            null
                        )
                    }
                </Form.Row>
                <Button variant="primary" onClick={() => {checkUserIDIsUnique(userID, handleSubmit)}}>회원가입</Button>
                <Button variant="info" onClick={() => {history.push('/login')}}>돌아가기</Button>
            </Form.Group>
        </div>
    );
};

export default RegisterForm;