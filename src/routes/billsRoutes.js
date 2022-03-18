const express = require('express');
const { getBills, writeBills } = require('../controllers/billsControllers');
const { validateToken } = require('../utils/helpers');

const billsRoutes = express.Router();

billsRoutes.get('/bills/:id', validateToken, getBills);
billsRoutes.post('/bills', validateToken, writeBills);

module.exports = billsRoutes;
