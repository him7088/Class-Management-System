const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
        default: 'Admin',
    },
}, {
    timestamps: true,
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;

