const express = require('express');
const { getBills } = require('../controllers/billsControlers');

const billsRoutes = express.Router();

billsRoutes.get('/bills/:id', getBills);

module.exports = billsRoutes;
