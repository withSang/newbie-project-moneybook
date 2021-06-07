import React from 'react';
import ChangePasswordForm from '../components/ChangePasswordForm';
import RemoveUserButton from '../components/RemoveUserButton';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './ProfilePage.css';

function ProfilePage({ user, logout }) {
    return (
        <div>
            <Container fluid>
                <Row>
                    <h3>비밀번호 변경</h3>
                </Row>
                <Row>
                    <ChangePasswordForm user={user}/>
                </Row>
                <Row>
                    <h3>프리셋 조회, 수정하기</h3>
                </Row>
                <Row>
                    <Link to="/preset"><Button variant="primary">프리셋 수정 페이지로</Button></Link>
                </Row>
                <Row>
                    <h3>탈퇴 메뉴</h3>
                </Row>
                <Row>
                    <RemoveUserButton user={user} logout={logout}/>
                </Row>
            </Container>
        </div>
    );
};


export default ProfilePage;