const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function getAllBillsFromDb(id) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM bills WHERE group_id = ?';
    const [result] = await connection.execute(sql, [id]);
    await connection.close();
    return result;
  } catch (error) {
    console.log('getAllBillsFromDb ===', error);
  }
}

module.exports = {
  getAllBillsFromDb,
};
