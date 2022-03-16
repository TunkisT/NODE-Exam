const { getAllBillsFromDb, writeBillToDb } = require('../models/billsModels');
const { successResponse, failResponse } = require('../utils/dbHelpers');

async function getBills(req, res) {
  const billsObj = await getAllBillsFromDb(req.params.id);
  if (billsObj === false) {
    failResponse(res);
    return;
  }
  successResponse(res, billsObj);
}

async function writeBills(req, res) {
  const data = req.body;
  const billsObj = await writeBillToDb(data);
  if (billsObj === false) {
    failResponse(res);
    return;
  }
  successResponse(res, billsObj);
}

module.exports = {
  getBills,
  writeBills,
};
