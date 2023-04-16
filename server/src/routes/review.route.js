const express = require('express');
const { createReview, getReview, deleteReview } = require('../controllers/review.controller');
const { userMiddleware } = require('../middlewares');

const app = express.Router();

// Create
app.post('/', userMiddleware, createReview);

// Get single
app.get('/:gigID', getReview);

// Delete
app.delete('/:_id', userMiddleware, deleteReview);

module.exports = app;