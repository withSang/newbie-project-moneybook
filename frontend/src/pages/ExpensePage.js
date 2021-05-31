import React, { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';

function ExpensePage({ user }) {
    const { name } = user;
    const [ expenseModified, setExpenseModified ] = useState(false);
    return (
        <div>
            <h2>{name}의 가계부 페이지</h2>
            <ExpenseForm user={user} setExpenseModified={setExpenseModified}/>
        </div>
    );
}

export default ExpensePage;
