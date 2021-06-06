const ExpenseModel = require('../models/expense');
const { checkUserID, checkGenericInput } = require('../security/checkInput');

// Create - 새 가계부 항목을 추가한다.
function addExpense(userID, {name, date, money, isPositive, isSchool}, callback) {
    if ( !checkUserID(userID) || !checkGenericInput(name)) {
        callback(null);
        return;
    }
    const newExpense = new ExpenseModel({
        name,
        userID,
        date: new Date(date),
        money,
        isPositive,
        isSchool
    })
    newExpense.save((err, result) => {
        if (!err) {
            callback("ok");
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

// Retrieve - 특정 사용자, 특정 날짜 범위의 가계부 항목을 모두 가져온다.
function getExpensesByDate(userID, startDate, endDate, callback) {
    if ( !checkUserID(userID) ) {
        callback(null);
        return;
    }
    ExpenseModel.find({
        userID,
        date: { $gt: startDate, $lt: endDate }
    }, (err, expenses) => {
        if ( !err ) {
            callback(expenses);
        } else {
            callback( err );
            return;
        }
    })
}

// Retrieve - 특정 사용자, 특정 날짜 범위의 가계부 항목을 파일로 다운로드한다.
function exportExpensesByDate(userID, ids, callback) {
    if ( !checkUserID(userID) ) {
        callback(null);
        return;
    }
    ExpenseModel.find({
        userID : userID,
        '_id' : { $in: ids }
    }, (err, expenses) => {
        if (!err) {
            let csvContents = "";
            csvContents += ("날짜,내역,입금,출금" + '\r\n');
            expenses.forEach((item) => {
                let row = [item.date.toLocaleDateString('ko-KR').split(" ").map(v=>v.replace(".","")).join("-"),
                           item.name + (item.isSchool ? (" (교내)") : (" (교외)")),
                           "",
                           ""]
                if (item.isPositive) {
                    row[2] = item.money
                } else {
                    row[3] = item.money
                }
                csvContents += (row.join(',') + '\r\n');
            })
            callback(csvContents);
        } else {
            callback(null);
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
    getExpensesByDate,
    updateOneExpense,
    deleteOneExpense,
    exportExpensesByDate
}