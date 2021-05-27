const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    password : String,
}, {timestamps: true});
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;