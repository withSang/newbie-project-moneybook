import React from 'react';
import ExpenseForm from './ExpenseForm';
import axios from 'axios';

function ExpenseAddForm({user, expense, setExpenseModified}) {
    const requestExpenseAdd = ({_id, userID, name, date, money, isPositive, isSchool}, callback) => {
        axios.post('/api/expense/add', {
            userID,
            name,
            date,
            money,
            isPositive,
            isSchool
        }).then((result) => {
            if (result) {
                alert('추가되었습니다.');
                callback();
            } else {
                alert('오류가 발생했습니다. 나중에 다시 시도해주세요.')
            }
        }).catch((error) => {
            alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
        })
    };

    return (
        <ExpenseForm user={user} expense={undefined} setExpenseModified={setExpenseModified} buttonText="추가" callback={requestExpenseAdd}/>
    )
}

export default ExpenseAddForm;