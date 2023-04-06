const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversationID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    versionKey: false
});

module.exports = mongoose.model('Message', messageSchema);