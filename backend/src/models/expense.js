//소비 내역
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name : String,
    userID : String,
    date : {
        type: Date,
        default: new Date()
    },
    money : {
        type: Number,
        default: 0
    },
    isPositive : {
        type: Boolean,
        default: false //기본값은 지출
    },
    isSchool : {
        type: Boolean,
        default: true //기본은 교내
    }
}, {timestamps: true});
const ExpenseModel = mongoose.model("expense", expenseSchema);

module.exports = ExpenseModel;