import React from 'react';
import ChangePasswordForm from '../components/ChangePasswordForm';
import RemoveUserButton from '../components/RemoveUserButton';

function ProfilePage({ user, logout }) {
    return (
        <div>
            <h1>프로필 페이지</h1>
            <ChangePasswordForm user={user}/>
            <h2>탈퇴 메뉴</h2>
            <RemoveUserButton user={user} logout={logout}/>
        </div>
    );
};


export default ProfilePage;