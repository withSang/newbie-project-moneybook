import React from 'react';
import ExpenseForm from './ExpenseForm';
import axios from 'axios';

function ExpenseEditForm({user, setExpenseModified, expenseToEdit, setExpenseToEdit}) {
    const requestExpenseEdit = ({_id, userID, name, date, money, isPositive, isSchool}, callback) => {
        axios.post('/api/expense/update', {
            _id,
            userID,
            name,
            date,
            money,
            isPositive,
            isSchool
        }).then((result) => {
            if (result) {
                alert('수정되었습니다.');
                setExpenseToEdit(null);
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
        <ExpenseForm user={user} expense={expenseToEdit} setExpenseModified={setExpenseModified} buttonText="수정" callback={requestExpenseEdit}/>
    )
};

export default ExpenseEditForm;