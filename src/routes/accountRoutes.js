const express = require('express');
const { getAccounts } = require('../controllers/accountControllers');
const { validateToken } = require('../utils/helpers');

const accountRoutes = express.Router();

accountRoutes.get('/groups', validateToken, getAccounts);

module.exports = accountRoutes;
