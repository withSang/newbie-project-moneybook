//소비 내역
const mongoose = require('mongoose');
import {utcToKst} from '../misc/timeZone';

const expenseSchema = new mongoose.Schema({
    name : String,
    userID : String,
    date : {
        type: Date,
        default: utcToKst(new Date())
    },
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