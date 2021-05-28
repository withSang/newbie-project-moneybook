import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function LoginPage({ authenticated, login, location }) {
    const [user_id, setUser_id] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        try {
            login({user_id, password});
        } catch(e) {
            alert('로그인 실패!');
            setUser_id("");
            setPassword("");
        }
    };

    const { from } = location.state || { from: { pathname: "/"} };
    if (authenticated) return <Redirect to={from} />;

    return (
        <div>
            <h1>로그인 페이지</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value = {user_id}
                    onChange = {({ target : { value } }) => setUser_id(value)}
                    type = "text"
                    placeholder = "아이디"
                />
                <input
                    value = {password}
                    onChange = {({ target : { value }}) => setPassword(value)}
                    type = "password"
                    placeholder = "비밀번호"
                />
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}

export default LoginPage;