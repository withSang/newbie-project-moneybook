const express = require('express')
const db = require('../db');

const router = express.Router();

//Create
router.post('/signup', (req, res) => {
    const {name, userID, password} = req.body;
    db.addUser(name, userID, password, (result) => {
        res.status(200).json(result);
    });
});

//Retrieve
router.post('/signup/checkid', (req, res) => {
    const { userID } = req.body;
    db.checkDuplicateUserID(userID, (result) => {
        if (result === 'unavailable') {
            res.status(401).json(result);
        } else { //"ok"
            res.status(200).json(result);
        }
    })
})

//Retrieve
router.post('/signin', (req, res) => {
    const { userID, password } = req.body;
    db.findUser(userID, password, (user) => {
        res.status(200).json(user);
    })
})

//Update
router.post('/changepassword', (req, res) => {
    const {userID, nowPassword, newPassword} = req.body;
    db.updateUser(userID, nowPassword, newPassword, (result) => {
        if (result==="ok") {
            res.status(200).json({result});
        } else {
            if (result==="wrong userID" || result==="wrong password") {
                res.status(401).json({error: result});
            } else { //internal server error
                res.status(503).json({error: result});
            }
        }
    });
});

//Delete
router.delete('/removeuser', (req, res) => {
    const { userID } = req.body;
    db.removeUser(userID, (result) => {
        if (result === 'ok') {
            res.status(200).json({result});
        } else {
            res.status(503).json({error: result});
        }
    })
})

module.exports = router;