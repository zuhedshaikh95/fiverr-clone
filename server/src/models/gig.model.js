const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
    
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Gig', gigSchema);