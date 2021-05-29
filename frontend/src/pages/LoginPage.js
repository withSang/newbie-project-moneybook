import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { checkGenericInput } from '../security/checkInput';

function LoginPage({ authenticated, setUser, location }) {
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        const resetField = () => {
          alert('로그인 실패! 아이디나 비밀번호를 확인해주세요.');
          setUserID("");
          setPassword("");
        }
        if (checkGenericInput(userID) && checkGenericInput(password)) {
            axios.post("api/user/signin", {userID, password})
                .then((response) => {
                    const newUser = response.data;
                    if (newUser) {
                        setUser(newUser);
                        alert('로그인 되었습니다.');
                    } else {
                        resetField();
                }
            })
        } else {
          resetField();
        }
    }
    

  const { from } = location.state || { from: { pathname: "/"} };
  if (authenticated) return <Redirect to={from} />;

  return (
    <div>
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
        <button onClick={handleSubmit}>로그인</button>
    </div>
  );
}

export default LoginPage;