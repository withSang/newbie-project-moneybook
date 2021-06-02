import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseItem from '../components/ExpenseItem';
import axios from 'axios';

function ExpensePage({ user }) {
    const { name } = user;
    const [ expenseToEdit, setExpenseToEdit ] = useState(null);
    const [ expenseModified, setExpenseModified ] = useState(false);
    const [ expenses, setExpenses ] = useState([]);
    const [ expenseItems, setExpenseItems ] = useState([]);
    const [ totalMoney, setTotalMoney ] = useState({inSchool:0, outSchool:0});

    const generateTotalMoneyText = (value) => {
        if (value === 0) return "총 지출 없음"
        return `총 ${(value > 0) ? ("수입") : ("지출")} ${Math.abs(value)}원`
    }


    useEffect(() => {
        //처음에 expenseModified의 상태를 바꾸면, 위 useEffect에 의해 가계부 목록이 불러와진다.
        setExpenseModified(true); 
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
            }).then(()=>{
                setExpenseItems(expenses.map((item, index) => {
                    return <ExpenseItem item={item} key={index} setExpenseModified={setExpenseModified} setExpenseToEdit={setExpenseToEdit}/>
                }));
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


    // 사용내역이 바뀌면 총 금액 다시 계산
    useEffect(() => {
        let inSchool = 0;
        let outSchool = 0;
        expenses.forEach((value) => {
            if (value.isSchool) {
                inSchool += ( value.isPositive ? (1) : (-1) ) * (value.money);
            } else {
                outSchool += ( value.isPositive ? (1) : (-1) ) * (value.money);
            }
        })
        setTotalMoney({inSchool, outSchool});
    }, [expenses]);

    return (
        <div>
            <h2>{name}의 가계부 페이지</h2>
            <p>(최종 결산) <strong>교내</strong> : { generateTotalMoneyText(totalMoney.inSchool) },  <strong>교외</strong> : { generateTotalMoneyText(totalMoney.outSchool) }, <strong>전체</strong> : { generateTotalMoneyText(totalMoney.inSchool + totalMoney.outSchool) }</p>
            <ExpenseForm user={user} setExpenseModified={setExpenseModified} expenseToEdit={expenseToEdit} setExpenseToEdit={setExpenseToEdit} />
            {expenseItems}
        </div>
        
    );
}

export default ExpensePage;
