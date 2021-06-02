import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseItem from '../components/ExpenseItem';
import axios from 'axios';

function ExpensePage({ user }) {
    const { name } = user;
    const [ expenseToEdit, setExpenseToEdit ] = useState(null);
    const [ expenseModified, setExpenseModified ] = useState(true);
    const [ expenses, setExpenses ] = useState([])

    useEffect(() => {
        //처음에 expenseModified의 상태를 바꾸면, 아래 useEffect에 의해 가계부 목록이 불러와진다.
        setExpenseModified(false); 
    }, []);

    useEffect(() => {
        if (expenseModified) {
            axios.post('/api/expense/getAll', {userID: user.userID})
            .then((results) => {
                //시간 순대로 정렬
                let newExpenses = results.data;
                newExpenses.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()); 
                setExpenses(newExpenses);
                setExpenseModified(false);
            })
            .catch((error) => {
                alert(error);
                return;
            })
            return;
        } else {
            return;
        }
    }, [expenseModified, expenses, user.userID]);

    

    return (
        <div>
            <h2>{name}의 가계부 페이지</h2>
            <ExpenseForm user={user} setExpenseModified={setExpenseModified} expenseToEdit={expenseToEdit} setExpenseToEdit={setExpenseToEdit} />
            {expenses.map((item, index) => {
                return <ExpenseItem item={item} key={index} setExpenseModified={setExpenseModified} setExpenseToEdit={setExpenseToEdit}/>
            })}
        </div>
        
    );
}

export default ExpensePage;
