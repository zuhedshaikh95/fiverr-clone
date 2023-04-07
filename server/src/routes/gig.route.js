const express = require('express');
const { userMiddleware } = require('../middlewares');
const { createGig, deleteGig, getGig, getGigs } = require('../controllers/gig.controller');

const app = express.Router();

app.post('/', userMiddleware, createGig);
app.delete('/:_id', userMiddleware, deleteGig);
app.get('/single/:_id', userMiddleware, getGig);
app.get('/', userMiddleware, getGigs);

module.exports = app;