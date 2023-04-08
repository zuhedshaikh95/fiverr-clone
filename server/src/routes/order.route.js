const express = require('express');
const { userMiddleware } = require('../middlewares');
const { createOrder, getOrders } = require('../controllers/order.controller');
const app = express.Router();

// Create
app.post('/:_id', userMiddleware, createOrder);

// Get all
app.get('/', userMiddleware, getOrders);

module.exports = app;