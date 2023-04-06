const express = require('express');

const app = express.Router();

app.get('/', (request, response) => {
    return response.send('Message')
});

module.exports = app;