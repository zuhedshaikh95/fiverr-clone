const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    gigID: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sellerID: {
        type: String,
        required: true,
    },
    buyerID: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    payment_intent: {
        type: String,
        required: true,
    },
}, {
    versionKey: false
});

module.exports = mongoose.model('Order', orderSchema);