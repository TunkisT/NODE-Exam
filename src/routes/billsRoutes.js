const express = require('express');
const { getBills, writeBills } = require('../controllers/billsControlers');

const billsRoutes = express.Router();

billsRoutes.get('/bills/:id', getBills);
billsRoutes.post('/bills', writeBills);

module.exports = billsRoutes;
