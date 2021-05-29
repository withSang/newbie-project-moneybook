import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { checkName, checkUserID, checkPassword } from '../security/checkInput';
import axios from 'axios';


function RegisterPage() {
    const [ name, setName ] = useState("");
    const [ nameWarning, setNameWarning ] = useState("");
    const [ userID, setUserID ] = useState("");
    const [ userIDWarning, setUserIDWarning ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordWarning, setPasswordWarning ] = useState("");

    const history = useHistory();

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
        axios.post("api/user/add", {name, userID, password})
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
            <input
                value = {name}
                onChange = {({ target : { value } }) => setName(value)}
                type = "text"
                placeholder = "이름"
            />
            <p class='warning'>{nameWarning}</p>
            <input
                value = {userID}
                onChange = {({ target : { value } }) => setUserID(value)}
                type = "text"
                placeholder = "아이디"
            />
            <p class='warning'>{userIDWarning}</p>
            <input
                value = {password}
                onChange = {({ target : { value } }) => setPassword(value)}
                type = "password"
                placeholder = "비밀번호"
            />
            <p class='warning'>{passwordWarning}</p>
            <button onClick={handleSubmit}>회원가입</button>
            <button onClick={() => {history.push('/login')}}>돌아가기</button>
        </div>
    );
};

export default RegisterPage;