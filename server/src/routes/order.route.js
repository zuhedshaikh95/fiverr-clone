const express = require('express');
const { userMiddleware } = require('../middlewares');
const { getOrders, paymentIntent, updatePaymentStatus } = require('../controllers/order.controller');
const app = express.Router();

// Get all
app.get('/', userMiddleware, getOrders);

// Payment
app.post('/create-payment-intent/:_id', userMiddleware, paymentIntent);

// Payment confirm
app.patch('/', userMiddleware, updatePaymentStatus);

module.exports = app;