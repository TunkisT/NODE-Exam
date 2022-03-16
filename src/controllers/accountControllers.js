const { getAccountsFromDb } = require('../models/accountModel');
const { failResponse, successResponse } = require('../utils/dbHelpers');

async function getAccounts(req, res) {
  console.log('req.userId ===', req.userId);

  const groupObj = await getAccountsFromDb(req.userId);
  if (groupObj === false) {
    failResponse(res);
    return;
  }
  successResponse(res, groupObj);
}

module.exports = {
  getAccounts,
};
