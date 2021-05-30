import React from 'react';
import ChangePasswordForm from '../components/ChangePasswordForm';

function ProfilePage({ user, setUser }) {
    return (
        <div>
            <h1>프로필 페이지</h1>
            <ChangePasswordForm user={user}/>
        </div>

    );
};


export default ProfilePage;