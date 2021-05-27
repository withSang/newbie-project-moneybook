//Login Test Component
import React from 'react';

function Profile({ user }) {
    const {name, password} = user || {};
    return (
      <div>
        <p>name</p>
        <p>{name}</p>
        <p>password</p>
        <p>{password}</p>
      </div>
    );
}

export default Profile;