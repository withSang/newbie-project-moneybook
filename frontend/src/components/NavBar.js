import React from 'react';
import { Link } from 'react-router-dom';
import LogoutNavLink from './LogoutNavLink'; 
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavBar = ({ authenticated, logout, user }) => {
    return (
        authenticated ? (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>{user.name}의 가계부</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/moneybook">가계부</Nav.Link>
                        <Nav.Link as={Link} to="/profile">프로필</Nav.Link>
                        <LogoutNavLink logout={logout} /> 
                    </Nav>
                </Navbar>
            </div>
        ) : (
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>당신의 가계부</Navbar.Brand>
                </Navbar>
        )
    );
};

export default NavBar;