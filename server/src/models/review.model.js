const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    gigID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    star: {
        type: String,
        required: true,
        max: 5
    },
    description: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Review', reviewSchema);