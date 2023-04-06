const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    id: {
        type: String,
        requied: true,
        unique: true
    },
    sellerID: {
        type: String,
        required: true
    },
    buyerID: {
        type: String,
        required: true
    },
    readBySeller: {
        type: Boolean,
        required: true
    },
    readByBuyer: {
        type: Boolean,
        required: true
    },
    lastMessage: {
        type: String,
        required: false
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Conversation', conversationSchema);