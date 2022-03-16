const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { failResponse } = require('./dbHelpers');

const jwtSecret = process.env.JWT_TOKEN_SECRET;

function hashPass(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}

function verifyHash(enteredPassword, userObj) {
  return bcrypt.compareSync(enteredPassword, userObj.password);
}

function generateJwtToken(userObj) {
  return jwt.sign({ id: userObj.user_id }, jwtSecret, { expiresIn: '24h' });
}

function verifyJwtToken(token) {
  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (error) {
    console.log('error ===', error);
    return false;
  }
}

function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const tokenGotFromUser = authHeader && authHeader.split(' ')[1];
  if (!tokenGotFromUser) return failResponse(res, 'no token', 401);
  const verifyResult = verifyJwtToken(tokenGotFromUser);

  if (verifyResult === false) return failResponse(res, 'invalid token', 403);
  req.userId = verifyResult.id;
  return next();
}

module.exports = {
  hashPass,
  verifyHash,
  generateJwtToken,
  validateToken,
};
