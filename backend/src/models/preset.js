//가계부 프리셋
const mongoose = require('mongoose');

const presetSchema = new mongoose.Schema({
    name : String,
    userID : String,
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
    },
    alias : {
        type: String,
        unique: true
    }
}, {timestamps: true});
const PresetModel = mongoose.model("preset", presetSchema);

module.exports = PresetModel;