const express = require('express');
const { userMiddleware } = require('../middlewares');
const { createMessage, getMessages } = require('../controllers/message.controller');
const app = express.Router();

// Create
app.post('/', userMiddleware, createMessage);

// Get all of one conversation
app.get('/:conversationID', userMiddleware, getMessages);

module.exports = app;