import React from 'react';
import ExpenseForm from './ExpenseForm';
import axios from 'axios';

function ExpenseEditForm({user, expense, setExpenseModified}) {
    const requestExpenseEdit = ({_id, userID, name, date, money, isPositive, isSchool}, callback) => {
        axios.post('/api/expense/edit', {
            _id,
            userID
        }).then((result) => {
            if (result) {
                alert('수정되었습니다.');
                callback();
            } else {
                alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
            }
        }).catch((error) => {
            alert(error);
            alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
        })
    };

    return (
        <ExpenseForm user={user} expense={expense} setExpenseModified={setExpenseModified} buttonText="수정" callback={requestExpenseEdit}/>
    )
};

export default ExpenseEditForm;