const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function addUserToDb(full_name, email, passHash) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO users (full_name, email , password) VALUES (?, ?, ?)';

    const { result } = await connection.execute(sql, [
      full_name,
      email,
      passHash,
    ]);
    await connection.close();
    return result;
  } catch (error) {
    return false;
  }
}

async function getUserFromDb(email) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM users WHERE email = ?';

    const [userFoundResult] = await connection.execute(sql, [email]);
    await connection.close();
    return userFoundResult;
  } catch (error) {
    return false;
  }
}

module.exports = {
  addUserToDb,
  getUserFromDb,
};
