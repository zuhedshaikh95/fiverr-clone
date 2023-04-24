const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connect = () => {
    return mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connect;