const express = require('express');
const {
  authController,
  loginController,
} = require('../controllers/authControllers');

const authRoutes = express.Router();

authRoutes.post('/register', authController);
authRoutes.post('/login', loginController);

module.exports = authRoutes;
