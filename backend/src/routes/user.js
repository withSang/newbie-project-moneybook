const express = require('express')
const db = require('../db');

const router = express.Router();

router.post('/signin', (req, res) => {
    const { userID, password } = req.body;
    db.findUser(userID, password, (user) => {
        res.json(user);
    })
})

router.get('/add', (req, res) => {
    const {name, userID, password} = req.query;
    db.addUser(name, userID, password, (result) => {
        res.json(result);
    });
})

router.post('/add', (req, res) => {
    const {name, userID, password} = req.params;
    db.addUser(name, userID, password, (result) => {
        res.json(result);
    });
})

module.exports = router;