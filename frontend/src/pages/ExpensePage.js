import React, { useState, useEffect } from 'react';
import ExpenseAddForm from '../components/ExpenseAddForm';
import ExpenseEditForm from '../components/ExpenseEditForm';
import ExpenseItem from '../components/ExpenseItem';
import axios from 'axios';

function ExpensePage({ user }) {
    const { name } = user;
    // const [ editMode, setEditMode ] = useState(false); //수정중(true)인지 새로 추가중(false)인지
    const [ expenseToEdit, setExpenseToEdit ] = useState(null);
    const [ expenseModified, setExpenseModified ] = useState(true);
    const [ expenses, setExpenses ] = useState([])

    useEffect(() => {
        //처음에 exepenseModified의 상태를 바꾸면, 아래 useEffect에 의해 가계부 목록이 불러와진다.
        setExpenseModified(false); 
    }, [])

    useEffect(() => {
        if (expenseModified) {
            setExpenseModified(false);

            axios.post('/api/expense/getAll', {userID: user.userID})
            .then((results) => {
                //시간 순대로 정렬
                let newExpenses = results.data;
                newExpenses.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()); 
                setExpenses(newExpenses);
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

    useEffect(() => {
        
    }, [expenseToEdit]);

    return (
        <div>
            <h2>{name}의 가계부 페이지</h2>
            {expenseToEdit? (
                <ExpenseEditForm user={user} setExpenseModified={setExpenseModified} expenseToEdit={expenseToEdit} setExpenseToEdit={setExpenseToEdit} />
            ) : (
                <ExpenseAddForm user={user} setExpenseModified={setExpenseModified} />
            )}
            {expenses.map((item, index) => {
                return <ExpenseItem item={item} key={index} setExpenseModified={setExpenseModified} setExpenseToEdit={setExpenseToEdit}/>
            })}
        </div>
        
    );
}

export default ExpensePage;
