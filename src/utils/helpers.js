const bcrypt = require('bcryptjs');
const Joi = require('joi');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { failResponse } = require('./dbHelpers');

const jwtSecret = process.env.JWT_TOKEN_SECRET;

async function validateLogin(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const formatedError = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
    }));
    const responseToSend = {
      success: false,
      error: formatedError,
    };
    res.status(400).json(responseToSend);
  }
}

async function validateRegistration(req, res, next) {
  const schema = Joi.object({
    full_name: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const formatedError = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
    }));
    const responseToSend = {
      success: false,
      error: formatedError,
    };
    res.status(400).json(responseToSend);
  }
}

function hashPass(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}

function verifyHash(enteredPassword, userObj) {
  return bcrypt.compareSync(enteredPassword, userObj.password);
}

function generateJwtToken(userObj) {
  return jwt.sign({ id: userObj.user_id }, jwtSecret, { expiresIn: '1h' });
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
  validateLogin,
  validateRegistration,
};
