//소비 내역
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name : String,
    user : mongoose.Schema.Types.ObjectId,
    money : {
        type: Number,
        default: 0
    },
    is_positive : {
        type: Boolean,
        default: false //기본값은 지출
    },
    is_school : {
        type: Boolean,
        default: true //기본은 교내
    }
}, {timestamps: true});
const ExpenseModel = mongoose.model("expense", expenseSchema);

module.exports = ExpenseModel;