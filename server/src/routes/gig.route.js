const express = require('express');

const app = express.Router();

app.get('/', (request, response) => {
    return response.send('Gig')
});

module.exports = app;