//가계부 프리셋
const mongoose = require('mongoose');

const presetSchema = new mongoose.Schema({
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
    },
    alias : {
        type: String,
        unique: true
    }
}, {timestamps: true});
const PresetModel = mongoose.model("preset", presetSchema);

module.exports = PresetModel;