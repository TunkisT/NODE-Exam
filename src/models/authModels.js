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
    console.log('addUserToDb ===', error);
    return false;
  }
}

module.exports = {
  addUserToDb,
};
