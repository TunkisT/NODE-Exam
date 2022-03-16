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

    const [result] = await connection.query(sql, [id]);
    await connection.close();
    return result;
  } catch (error) {
    console.log('getGroupsFromDb ===', error);
    return false;
  }
}

module.exports = {
  getAccountsFromDb,
};
