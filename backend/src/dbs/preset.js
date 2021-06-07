const PresetModel = require('../models/preset');
const { checkUserID, checkGenericInput } = require('../security/checkInput');


// Create - 새 프리셋 항목을 추가한다.
function addPreset(userID, {name, money, isPositive, isSchool}, callback) {
    if ( !checkUserID(userID) || !checkGenericInput(name)) {
        callback(null);
        return;
    }
    const newPreset = new PresetModel({
        name,
        userID,
        money,
        isPositive,
        isSchool
    })
    newPreset.save((err, result) => {
        if (!err) {
            callback("ok");
        } else {
            callback(null);
        }
    })
}

// Retrieve - 특정 사용자의 프리셋 항목을 모두 가져온다.
function getAllPresetsByUser(userID, callback) {
    if ( !checkUserID(userID) ) {
        callback(null);
        return;
    }
    PresetModel.find({userID}, (err, presets) => {
        if ( !err ) {
            callback(presets);
        } else {
            callback(null);
            return;
        }
    })  
}

// Update - 특정 프리셋 항목 하나를 수정한다.
function updateOnePreset(userID, {_id, name, money, isPositive, isSchool}, callback) {
    if ( !checkUserID(userID) || !checkGenericInput(name)) {
        callback(null);
        return;
    }
    PresetModel.findById(_id, (err, preset) => {
        if (!err) {
            Object.assign(preset, { name, money, isPositive, isSchool })
            preset.save((err) => {
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

// Delete - 특정 프리셋 항목 하나를 삭제한다.
function deleteOnePreset(userID, _id, callback) {
    PresetModel.deleteOne({userID, _id}, (err) => {
        if (!err) {
            callback("ok");
        } else {
            callback("internal server error");
        }
    })   
}

module.exports = {
    addPreset,
    getAllPresetsByUser,
    updateOnePreset,
    deleteOnePreset
}