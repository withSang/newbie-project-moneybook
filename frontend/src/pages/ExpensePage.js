import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import DateChoiceForm from '../components/DateChoiceForm';
import ExpenseItem from '../components/ExpenseItem';
import axios from 'axios';
import { checkDate } from '../security/checkInput';
import Button from 'react-bootstrap/Button';

function ExpensePage({ user }) {
    const { name, userID } = user;
    const [ startDate, setStartDate ] = useState(new Date(new Date().getTime() - 7*86400*1000));
    const [ endDate, setEndDate ] = useState(new Date());
    const [ expenseToEdit, setExpenseToEdit ] = useState(null);
    const [ expenseModified, setExpenseModified ] = useState(false);
    const [ expenses, setExpenses ] = useState([]);
    const [ expenseItems, setExpenseItems ] = useState([]);
    const [ totalMoney, setTotalMoney ] = useState({inSchool:0, outSchool:0});

    const generateTotalMoneyText = (value) => {
        if (value === 0) return "총 지출 없음"
        return `${(value > 0) ? ("수입") : ("지출")} ${Math.abs(value)}원`
    }


    useEffect(() => {
        //처음에 expenseModified의 상태를 바꾸면, 아래 useEffect에 의해 가계부 목록이 불러와진다.
        setExpenseModified(true); 
    }, []);

    useEffect(() => {
        if (expenseModified) {
            if (!checkDate(startDate) || !checkDate(endDate)) {
                return;
            }
            const oneHour = 3600*1000; //1h=3,600,000ms
            axios.post('/api/expense/getByDate',
            {userID: userID,
             startDate: new Date(Math.round(startDate.getTime()/(24*oneHour))*(24*oneHour) - 9*oneHour ),
             endDate: new Date(Math.round(endDate.getTime()/(24*oneHour))*(24*oneHour) + 15*oneHour )})
            .then((results) => {
                setExpenses(results.data);
                setExpenseModified(false);
            }).then(()=>{
                setExpenseItems(expenses.map((item, index) => {
                    return <ExpenseItem item={item} key={index} setExpenseModified={setExpenseModified} setExpenseToEdit={setExpenseToEdit}/>
                }));
            })
            .catch((error) => {
                return;
            })
            return;
        } else {
            //시간 순대로 정렬
            let newExpenses = expenses;
            newExpenses.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()); 
            setExpenses(newExpenses);
        }
    }, [expenseModified, expenses, userID, startDate, endDate]);


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

    
    //다운로드 버튼을 누르면 사용 내역을 저장
    const handleDownloadClick = () => {
        if (!expenses.length) {
            alert('다운로드 가능한 내역이 없습니다.');
            return;
        }

        const IDsToDownload = expenses.map((value) => {
            return value["_id"];
        })

        axios.post('/api/expense/export', {
            userID,
            ids: IDsToDownload
        }).then(async (result) => {
            if (result) {
                    //엑셀 파일을 다운로드한다.
                    const url = `/api/static/${userID}.xls`
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'export.xls'
                    a.onclick = function() {
                        a.remove()
                        window.URL.revokeObjectURL(url);
                    }
                    await a.click()
                }
            else {
                // console.log("no result")
                alert('다운로드에 실패했습니다.')
            }
        }).then(()=>{
            // get 요청을 다시 보내 서버에 있는 엑셀 파일을 지운다.
            axios.get('/api/expense/export', {
                params : { userID }
            }).then((result) => {
                return;
            }).catch((error) => {
                return;
            })
        }).catch((error) => {
            // console.log(error);
            alert('다운로드에 실패했습니다.');
        })
    };


    return (
        <div>
            <h2>{name}의 가계부 페이지</h2>
            <ExpenseForm user={user} setExpenseModified={setExpenseModified} expenseToEdit={expenseToEdit} setExpenseToEdit={setExpenseToEdit} />
            <DateChoiceForm startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} setExpenseModified={setExpenseModified} /> 
            <Button variant='primary' onClick={ handleDownloadClick }>다운로드</Button>
            <p>(기간 내 결산) <strong>교내</strong> : { generateTotalMoneyText(totalMoney.inSchool) },  <strong>교외</strong> : { generateTotalMoneyText(totalMoney.outSchool) }, <strong>전체</strong> : { generateTotalMoneyText(totalMoney.inSchool + totalMoney.outSchool) }</p>
            {expenseItems}
        </div>
        
    );
}

export default ExpensePage;
