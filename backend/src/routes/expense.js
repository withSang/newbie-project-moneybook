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

// Update - 특정 가계부 항목 하나를 수정한다.
router.post('/update', (req, res) => {
    const {userID, _id, name, date, money, isPositive, isSchool} = req.body;
    db.updateOneExpense(userID, {_id, name, date, money, isPositive, isSchool}, (result) => {
        if (result === "ok") {
            res.status(200).json(result);
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