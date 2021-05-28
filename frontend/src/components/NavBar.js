import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton'; 

const NavBar = ({ authenticated, logout }) => {
    return (
        authenticated ? (
            <div className="navbar">
                <Link to='/moneybook'>
                    <button>가계부</button>
                </Link>
                <Link to='/profile'>
                    <button>프로필</button> 
                </Link>
                <LogoutButton logout={logout} /> 
            </div>
        ) : (
            null
        )
    );
};

export default NavBar;