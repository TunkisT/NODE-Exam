const { addUserToDb } = require('../models/authModels');
const { failResponse, successResponse } = require('../utils/dbHelpers');
const { hashPass } = require('../utils/helpers');

async function authController(req, res) {
  const { full_name, email, password } = req.body;
  console.log('req.body ===', req.body);

  const hashedPassword = hashPass(password);

  const insertUser = await addUserToDb(full_name, email, hashedPassword);
  if (insertUser === false) {
    failResponse(res);
    return;
  }
  successResponse(res, 'New user created!');
}

module.exports = {
  authController,
};
