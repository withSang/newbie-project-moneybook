import React from 'react';
import { withRouter } from 'react-router-dom';

function LogoutButton({ logout, history }) {
    const handleClick = () => {
        logout(); //callback으로 받은 로그아웃 수행
        alert('로그아웃 되었습니다.');
        history.push("/login"); //history에 접근하기 위해 withRouter를 쓴다.
    };

    return <button onClick = {handleClick}>로그아웃</button>;
}

export default withRouter(LogoutButton);