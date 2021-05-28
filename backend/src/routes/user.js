const express = require('express')
const db = require('../db');

const router = express.Router();

router.post('/login', (req, res) => {
    const { userID, password } = req.body;
    db.findUser(userID, password, (user) => {
        res.json(user);
    })
})

module.exports = router;