const bcrypt = require('bcryptjs');
require('dotenv').config();

// const jwtSecret = process.env.JWT_TOKEN_SECRET;

function hashPass(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}

module.exports = {
  hashPass,
};
