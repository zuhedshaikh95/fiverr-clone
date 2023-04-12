const express = require('express');
const { userMiddleware } = require('../middlewares');
const { createGig, deleteGig, getGig, getGigs } = require('../controllers/gig.controller');

const app = express.Router();

// Create
app.post('/', userMiddleware, createGig);

// Delete
app.delete('/:_id', userMiddleware, deleteGig);

// Get single
app.get('/single/:_id', getGig);

// Get all
app.get('/', getGigs);

module.exports = app;