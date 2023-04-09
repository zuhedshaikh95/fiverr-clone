const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const conversationSchema = new mongoose.Schema({
    conversationID: {
        type: String,
        default: uuidv4,
    },
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    buyerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    readBySeller: {
        type: Boolean,
        required: true,
    },
    readByBuyer: {
        type: Boolean,
        required: true,
    },
    lastMessage: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Conversation', conversationSchema);