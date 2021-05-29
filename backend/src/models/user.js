const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    userID : String,
    password_salt : String,
    password_hash : String,
}, {timestamps: true});
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;