import React from 'react';
import ChangePasswordForm from '../components/ChangePasswordForm';

function ProfilePage({ user, setUser }) {
    return (
        <ChangePasswordForm user={user}/>
    );
};

export default ProfilePage;