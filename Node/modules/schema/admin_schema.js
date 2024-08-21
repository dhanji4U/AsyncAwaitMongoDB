const mongoose = require('mongoose');
const moment = require('moment');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
    module_id: {
        type: Schema.Types.ObjectId,
        ref: "admin_module",
        required: true,
    },
    class_name: {
        type: String,
    },
    module: {
        type: String,
    },
    is_list: {
        type: Number,
        enum: [1, 0],
        default: 0,
    },
    is_create: {
        type: Number,
        enum: [1, 0],
        default: 0,
    },
    is_edit: {
        type: Number,
        enum: [1, 0],
        default: 0,
    },
    is_view: {
        type: Number,
        enum: [1, 0],
        default: 0,
    },
    is_change_status: {
        type: Number,
        enum: [1, 0],
        default: 0,
    },
    is_delete: {
        type: Number,
        enum: [1, 0],
        default: 0,
    },
    created_at: { type: Date, default: () => moment().utc().format("YYYY-MM-DD HH:mm:ss") },
    updated_at: { type: Date, default: () => moment().utc().format("YYYY-MM-DD HH:mm:ss") },

}, { _id: false });



const adminSchema = mongoose.Schema({
    admin_seq_id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: [true, 'Email already exist'],
        required: true,
        index: true
    },

    country_code: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    profile_image: {
        type: String,
        required: true,
        default: 'default.png'
    },

    role: {
        type: Number,
        enum: [1, 0],   // 1 => Super Admin  , 0 => Sub Admin
        default: 1,
        index: true
    },

    permission: {
        type: [permissionSchema],// Add permission schema to it
    },

    login_status: {
        type: String,
        enum: ['Online', 'Offline'],
        default: 'Offline',
        required: true
    },

    last_login: {
        type: Date,
        default: () => moment().format("YYYY-MM-DD HH:mm:ss")
    },

    token: {
        type: String,
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

    created_at: { type: Date, default: () => moment().utc().format("YYYY-MM-DD HH:mm:ss") },
    updated_at: { type: Date, default: () => moment().utc().format("YYYY-MM-DD HH:mm:ss") },
});

adminSchema.plugin(AutoIncrement, { inc_field: 'admin_seq_id', start_seq: 3 });


const adminModel = mongoose.model('admin', adminSchema, 'admin');

module.exports = adminModel;
