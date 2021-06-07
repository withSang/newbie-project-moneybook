import React from 'react';
import ChangePasswordForm from '../components/ChangePasswordForm';
import RemoveUserButton from '../components/RemoveUserButton';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function ProfilePage({ user, logout }) {
    return (
        <div>
            <h1>프로필 페이지</h1>
            <ChangePasswordForm user={user}/>
            <h2>프리셋 조회, 수정하기</h2>
            <Link to="/preset"><Button variant="primary">프리셋 수정 페이지로</Button></Link>
            <h2>탈퇴 메뉴</h2>
            <RemoveUserButton user={user} logout={logout}/>
        </div>
    );
};


export default ProfilePage;