import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { checkUserID, checkGenericInput } from '../security/checkInput';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function LoginPage({ authenticated, setUser, location }) {
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleSubmit = () => {
        const resetField = () => {
          alert('로그인 실패! 아이디나 비밀번호를 확인해주세요.');
          setUserID("");
          setPassword("");
        }
        if (checkUserID(userID) && checkGenericInput(password)) {
            axios.post("api/user/signin", {userID, password})
            .then((response) => {
                const newUser = response.data;
                if (newUser) {
                    setUser(newUser);
                    // alert('로그인 되었습니다.');
                } else {
                    resetField();
            }
            })
            .catch((e) => {
                alert('서버와의 연결이 불안정합니다.');
            })
        } else {
          resetField();
        }
    }
    

    const { from } = location.state || { from: { pathname: "/"} };
    if (authenticated) return <Redirect to={from} />;


    return (
        <Container style={{
            textAlign: 'center',
        }}>
            <h1 style={{
                marginTop: '2%',
                marginBottom: '2%'
            }}>로그인 페이지</h1>
                <Row className="row justify-content-center">
                    <Col xs={2}>아이디</Col>
                    <Col xs={2}>
                        <Form.Control
                            value = {userID}
                            onChange = {({ target : { value } }) => setUserID(value)}
                            type = "text"
                            placeholder = "아이디"
                        />
                    </Col>
                </Row>
                <Row className="row justify-content-center">
                    <Col xs={2}>비밀번호</Col>
                    <Col xs={2}>
                        <Form.Control
                            value = {password}
                            onChange = {({ target : { value }}) => setPassword(value)}
                            type = "password"
                            placeholder = "비밀번호"
                        />   
                    </Col>
                </Row>
                <Button variant='primary' onClick={handleSubmit}>로그인</Button>
                <Button variant='info' onClick={() => {history.push('/register')}}>회원가입</Button>
        </Container>
    );
}

export default LoginPage;