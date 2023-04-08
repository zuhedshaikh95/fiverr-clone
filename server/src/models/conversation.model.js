const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    conversationID: {
        type: String,
        requied: true,
        unique: true
    },
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    buyerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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