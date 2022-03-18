const express = require('express');
const {
  getAccounts,
  writeAccount,
} = require('../controllers/accountControllers');
const { validateToken } = require('../utils/helpers');

const accountRoutes = express.Router();

accountRoutes.get('/accounts', validateToken, getAccounts);
accountRoutes.post('/accounts', validateToken, writeAccount);

module.exports = accountRoutes;
