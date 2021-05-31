const ExpenseModel = require('../models/expense');
const { checkUserID, checkGenericInput } = require('../security/checkInput');
const { kstToUtc } = require('../misc/timeZone');

// Create - 새 가계부 항목을 추가한다.
function addExpense(userID, {name, date, money, isPositive, isSchool}, callback) {
    if ( !checkUserID(userID) || !checkGenericInput(name)) {
        callback(null);
        return;
    }
    const newExpense = new ExpenseModel({
        name,
        userID,
        date: kstToUtc(date),
        money,
        isPositive,
        isSchool
    })
    newExpense.save((err, result) => {
        if (!err) {
            callback(result);
        } else {
            callback(null);
        }
    })
}

// Retrieve - 특정 사용자의 가계부 항목을 모두 가져온다.
function getAllExpensesByUser(userID, callback) {
    if ( !checkUserID(userID) ) {
        callback(null);
        return;
    }
    ExpenseModel.find({userID}, (err, expenses) => {
        if ( !err ) {
            callback(expenses);
        } else {
            callback(null);
            return;
        }
    })
}

// Update - 특정 가계부 항목 하나를 수정한다.
function updateOneExpense(userID, {_id, name, date, money, isPositive, isSchool}, callback) {
    if ( !checkUserID(userID) || !checkGenericInput(name)) {
        callback(null);
        return;
    }
    ExpenseModel.findById(_id, (err, expense) => {
        if (!err) {
            Object.assign(expense, { name, date, money, isPositive, isSchool })
            expense.save((err) => {
                if (!err) {
                    callback("ok");
                    return;
                } else {
                    callback("internal server error");
                    return;
                }
            })
        } else {
            callback("internal server error");
        }
    })
}

// Delete - 특정 가계부 항목 하나를 삭제한다.
function deleteOneExpense(userID, _id, callback) {
    ExpenseModel.deleteOne({userID, _id}, (err) => {
        if (!err) {
            callback("ok");
        } else {
            callback("internal server error");
        }
    })
}

module.exports = {
    addExpense, 
    getAllExpensesByUser,
    updateOneExpense,
    deleteOneExpense
}