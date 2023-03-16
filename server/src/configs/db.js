const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connect = () => {
    return mongoose.connect(process.env.MONGODB_URL);
};

module.exports = connect;