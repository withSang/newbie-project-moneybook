import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function LogInForm({ authenticated, login, location }) {
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {
        try {
            login({userID, password});
        } catch(e) {
            alert('로그인 실패. 아이디나 비밀번호를 확인해주세요.');
            setUserID("");
            setPassword("");
        }
    };

    const { from } = location.state || { from: { pathname: "/"} };
    if (authenticated) return <Redirect to={from} />;

    return (
        <>
            <h1>로그인 페이지</h1>
            <input
                value = {userID}
                onChange = {({ target : { value } }) => setUserID(value)}
                type = "text"
                placeholder = "아이디"
            />
            <input
                value = {password}
                onChange = {({ target : { value }}) => setPassword(value)}
                type = "password"
                placeholder = "비밀번호"
            />
            <button onClick={handleClick}>로그인</button>
        </>
    );
}

export default LogInForm;