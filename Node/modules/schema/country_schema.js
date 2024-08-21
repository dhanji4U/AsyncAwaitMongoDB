const mongoose = require('mongoose');
const moment = require('moment');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const countrySchema = mongoose.Schema({
    country_seq_id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },

    flag: {
        type: String,
        required: true
    },

    nationality: {
        type: String,
        required: true
    },

    sortname: {
        type: String,
        required: true
    },

    calling_code: {
        type: String,
        required: true
    },

    currency_code: {
        type: String,
        required: true
    },

    currency_name: {
        type: String,
        required: true
    },

    currency_symbol: {
        type: String,
        required: false
    },

    language: {
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

    created_at: {
        type: Date,
        default: () => moment().format("YYYY-MM-DD HH:mm:ss")
    },

    updated_at: {
        type: Date,
        default: () => moment().format("YYYY-MM-DD HH:mm:ss")
    },
});

countrySchema.plugin(AutoIncrement, { inc_field: 'country_seq_id',start_seq: 1 });
const countryModel = mongoose.model('country', countrySchema, 'country');

module.exports = countryModel;