//프리셋 관리
const express = require('express');
const db = require('../dbs/preset');
const router = express.Router();


// Create - 새 프리셋 항목을 추가한다.
router.post('/add', (req, res) => {
    const {userID, name, money, isPositive, isSchool} = req.body;
    db.addPreset(userID, {name, money, isPositive, isSchool}, (result) => {
        if (result === "ok") {
            res.status(200).json(result);
        } else {
            res.status(401).json(result);
        }
    })    
})

// Retrieve - 특정 사용자의 프리셋 항목을 모두 가져온다.
router.post('/getAll', (req, res) => {
    const { userID } = req.body;
    db.getAllPresetsByUser(userID, (result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(401).json(result);
        }
    })
})

// Update - 특정 프리셋 항목 하나를 수정한다.
router.post('/update', (req, res) => {
    const {userID, _id, name, money, isPositive, isSchool} = req.body;
    db.updateOneExpense(userID, {_id, name, date, money, isPositive, isSchool}, async (result) => {
        if (result === "ok") {
            res.status(200).send(result);
        } else { //"internal server error"
            res.status(401).json(result);
        }
    })
})

// Delete - 특정 프리셋 항목 하나를 삭제한다.
router.delete('/delete', (req, res) => {
    const {userID, _id} = req.body;
    db.deleteOnePreset(userID, _id, (result) => {
        if (result === "ok") {
            res.status(200).json(result);
        } else { //"internal server error"
            res.status(401).json(result);
        }
    })
})

module.exports = router;