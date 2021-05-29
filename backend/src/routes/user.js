const express = require('express')
const db = require('../db');

const router = express.Router();

router.post('/signin', (req, res) => {
    const { userID, password } = req.body;
    db.findUser(userID, password, (user) => {
        res.status(200).json(user);
    })
})

router.get('/add', (req, res) => {
    const {name, userID, password} = req.query;
    db.addUser(name, userID, password, (result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(401).json(result);
        }
    });
})

router.post('/add', (req, res) => {
    const {name, userID, password} = req.body;
    db.addUser(name, userID, password, (result) => {
        res.status(200).json(result);
    });
})

module.exports = router;