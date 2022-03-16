const {
  getAccountsFromDb,
  writeAccountToDb,
} = require('../models/accountModel');
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

async function writeAccount(req, res) {
  console.log('req.userId ===', req.userId);

  const accountObj = await writeAccountToDb(1, req.userId);
  if (accountObj === false) {
    failResponse(res);
    return;
  }
  successResponse(res, accountObj);
}

module.exports = {
  getAccounts,
  writeAccount,
};
