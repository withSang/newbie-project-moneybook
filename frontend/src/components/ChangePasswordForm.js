import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { checkPassword } from '../security/checkInput';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function ChangePasswordForm({ user }) {
    const [ nowPassword, setNowPassword ] = useState("");
    const [ nowPasswordWarning, setNowPasswordWarning ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ newPasswordWarning, setNewPasswordWarning ] = useState("");

    const history = useHistory();

    const clearForm = () => {
        setNowPassword("");
        setNewPassword("");
        return;
    };

    const handlePasswordChange = () => {
        //check input
        let wrongInput = false;
        if (!checkPassword(nowPassword)) {
            setNowPasswordWarning("현재 비밀번호가 올바르지 않습니다.");
            wrongInput = true;
        } else {
            setNowPasswordWarning("");
        }
        if (!checkPassword(newPassword)) {
            setNewPasswordWarning('비밀번호는 숫자, 알파벳 대소문자로 8~50자로 구성되어야 합니다.');
            wrongInput = true;
        } else {
            setNewPasswordWarning("");
        }
        if (wrongInput) {
            clearForm();
            return;
        }

        //update user password
        axios.post("api/user/changepassword", {userID: user.userID, nowPassword, newPassword})
        .then((response) => {
            alert('비밀번호가 정상적으로 변경되었습니다.');
            clearForm();
            history.push('/profile');
        }).catch((error) => {
            if (error.response.status === 401) {
                alert('현재 비밀번호가 일치하지 않습니다.');
            } else {
                alert('문제가 발생했습니다. 다시 시도해주세요.');
            }
            clearForm();
            history.push('/profile');
        })
        return;
    };

    return (
        <div>
            <h2>비밀번호 변경</h2>
            <Form.Group>
                <Form.Row>
                    <Col xs={2}>
                        <Form.Label>현재 비밀번호</Form.Label>
                    </Col>
                    <Col xs={2}>
                        <input
                            value = {nowPassword}
                            onChange = {({ target : { value } }) => setNowPassword(value)}
                            type = "password"
                            placeholder = "현재 비밀번호"
                        />
                    </Col>
                    { nowPasswordWarning ? (
                            <Col xs={3}>
                                <Alert variant="danger">{nowPasswordWarning}</Alert>
                            </Col>
                        ) : (
                            null
                        )
                    }
                </Form.Row>
                <Form.Row>
                    <Col xs={2}>
                        <Form.Label>새 비밀번호</Form.Label>
                    </Col>
                    <Col xs={2}>
                        <input
                            value = {newPassword}
                            onChange = {({ target : { value } }) => setNewPassword(value)}
                            type = "password"
                            placeholder = "새 비밀번호"
                        />
                    </Col>
                    { newPasswordWarning ? (
                            <Col xs={3}>
                                <Alert variant="danger">{newPasswordWarning}</Alert>
                            </Col>
                        ) : (
                            null
                        )
                    }
                </Form.Row>
            <Button variant="primary" onClick={handlePasswordChange}>비빌번호 변경하기</Button>
            </Form.Group>
        </div>
    );
};

export default ChangePasswordForm;