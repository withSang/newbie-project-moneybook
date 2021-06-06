//소비 내역 관리
const express = require('express');
const db = require('../dbs/expense');
const router = express.Router();

// Create - 새 가계부 항목을 추가한다.
router.post('/add', (req, res) => {
    const {userID, name, date, money, isPositive, isSchool} = req.body;
    db.addExpense(userID, {name, date, money, isPositive, isSchool}, (result) => {
        if (result === "ok") {
            res.status(200).json(result);
        } else {
            res.status(401).json(result);
        }
    })
})

// Retrieve - 특정 사용자의 가계부 항목을 모두 가져온다.
router.post('/getAll', (req, res) => {
    const { userID } = req.body;
    db.getAllExpensesByUser(userID, (result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(401).json(result);
        }
    })
})

// Retrieve - 특정 사용자, 특정 날짜 범위의 가계부 항목을 모두 가져온다.
router.post('/getByDate', (req, res) => {
    const { userID } = req.body;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    db.getExpensesByDate(userID, startDate, endDate, (result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(401).json(result);
        }
    })
    return;
})

// Retrieve - 특정 사용자, 특정 날짜 범위의 가계부 항목을 파일로 다운로드한다.
router.post('/export', (req, res) => {
    const {userID, ids} = req.body;
    db.exportExpensesByDate(userID, ids, (result) => {
        if (result) {
            res.writeHead(200, {
                'Content-Dispotition': 'attachment; filename="export.csv"',
                'Content-Type': 'text/plain',
            })
            const download = Buffer.from(result, 'utf8').toString('base64');
            res.end(download);
        } else {
            res.status(401).json(result);
        }
    })
})


// Update - 특정 가계부 항목 하나를 수정한다.
router.post('/update', (req, res) => {
    const {userID, _id, name, date, money, isPositive, isSchool} = req.body;
    db.updateOneExpense(userID, {_id, name, date, money, isPositive, isSchool}, async (result) => {
        if (result === "ok") {
            res.status(200)
               .contentType('text/csv')
               .send(result);
            // res.status(200)
            //    .attachment('result.csv')
            //    .send(result);
        } else { //"internal server error"
            res.status(401).json(result);
        }
    })
})

// Delete - 특정 가계부 항목 하나를 삭제한다.
router.delete('/delete', (req, res) => {
    const {userID, _id} = req.body;
    db.deleteOneExpense(userID, _id, (result) => {
        if (result === "ok") {
            res.status(200).json(result);
        } else { //"internal server error"
            res.status(401).json(result);
        }
    })
})

module.exports = router;