import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

function RemoveUserButton({ user, logout, history }) {
    const handleClick = () => {
        if (true) {
            removeUser();
        } else {
            return;
        }
    };

    const removeUser = () => {
        axios.delete('/api/user/removeuser', {
            data: {
                userID : user.userID
            }
        }).then((result) => {
            logout();
            alert('계정 정보가 삭제되었습니다. 감사합니다.');
            history.push('/login'); 
        }).catch((error)=> {
            alert('계정 삭제에 실패했습니다. 나중에 다시 시도해주세요.');
        })
    };

    return <Button variant="danger" onClick={handleClick}>탈퇴</Button>
}

export default withRouter(RemoveUserButton);