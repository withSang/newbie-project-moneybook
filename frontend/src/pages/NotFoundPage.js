import React from 'react';
import { Redirect } from 'react-router-dom';  

function NotFoundPage() {
    return (
        <Redirect to={{ pathname: '/moneybook' }}/>
    );
}

export default NotFoundPage;