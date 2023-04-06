const express = require('express');
const { userMiddleware } = require('../middlewares');
const { deleteUser } = require('../controllers/user.controller');

const app = express.Router();

app.delete('/:_id', userMiddleware, deleteUser);

module.exports = app;