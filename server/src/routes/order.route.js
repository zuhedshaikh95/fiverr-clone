const express = require('express');
const { userMiddleware } = require('../middlewares');
const { createOrder, getOrders, paymentIntent, updatePaymentStatus } = require('../controllers/order.controller');
const app = express.Router();

// Create
// app.post('/:_id', userMiddleware, createOrder);

// Get all
app.get('/', userMiddleware, getOrders);

// Payment
app.post('/create-payment-intent/:_id', userMiddleware, paymentIntent);

// Payment confirm
app.patch('/', userMiddleware, updatePaymentStatus);

module.exports = app;