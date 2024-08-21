const mongoose = require('mongoose');
const moment = require('moment');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const settingSchema = mongoose.Schema({
    setting_seq_id: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        required: true
    },

    value: {
        type: String,
        required: true
    },

    is_active: {
        type: Number,
        enum: [0, 1],
        default: 1,
        index: true
    },

    is_deleted: {
        type: Number,
        enum: [0, 1],
        default: 0,
        index: true
    },

    insert_time: {
        type: Date,
        default: () => moment().format("YYYY-MM-DD HH:mm:ss")
    },

    update_time: {
        type: Date,
        default: () => moment().format("YYYY-MM-DD HH:mm:ss")
    },
});

settingSchema.plugin(AutoIncrement, { inc_field: 'setting_seq_id', start_seq: 1 });

const settingModel = mongoose.model('setting', settingSchema, 'setting');

module.exports = settingModel;