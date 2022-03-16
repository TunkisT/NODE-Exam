const express = require('express');
const { authController } = require('../controllers/authControllers');

const authRoutes = express.Router();

authRoutes.post('/register', authController);

module.exports = authRoutes;
