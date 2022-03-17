const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function getAccountsFromDb(id) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT groups.group_id, groups.name
    FROM groups
    LEFT JOIN accounts
    ON groups.group_id = accounts.group_id
    WHERE accounts.user_id = ?;`;

    const [result] = await connection.execute(sql, [id]);
    await connection.close();
    return result;
  } catch (error) {
    return false;
  }
}

async function writeAccountToDb(group_id, user_id) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO accounts (group_id, user_id) VALUES (?, ?)';

    const [result] = await connection.execute(sql, [group_id, user_id]);
    await connection.close();
    return result;
  } catch (error) {
    return false;
  }
}

module.exports = {
  getAccountsFromDb,
  writeAccountToDb,
};
