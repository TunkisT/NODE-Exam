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
  console.log('req.group_id ===', req.body.group_id);

  const accountObj = await writeAccountToDb(req.body.group_id, req.userId);
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
