const express = require('express');
const { authLogin, authLogout, authRegister, authStatus } = require('../controllers/auth.controller');

const app = express.Router();

// Register
app.post('/register', authRegister);

// Login
app.post('/login', authLogin);

// Logout
app.post('/logout', authLogout)

// Check Auth status
app.post('/me', authStatus);

module.exports = app;