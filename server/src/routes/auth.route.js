const express = require('express');
const { authLogin, authLogout, authRegister } = require('../controllers/auth.controller');

const app = express.Router();

// Register
app.post('/register', authRegister);

// Login
app.post('/login', authLogin);

// Logout
app.post('/logout', authLogout)

module.exports = app;