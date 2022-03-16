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

async function writeBillToDb(data) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO bills (group_id, amount, description) VALUES (?, ?, ?)';
    const { group_id, amount, description } = data;
    const [result] = await connection.execute(sql, [
      group_id,
      amount,
      description,
    ]);
    await connection.close();
    return result;
  } catch (error) {
    console.log('writeBillToDb ===', error);
  }
}

module.exports = {
  getAllBillsFromDb,
  writeBillToDb,
};
