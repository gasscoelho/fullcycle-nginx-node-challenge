import { pool } from '#infra/database/index'

async function deleteMany(ids) {
  const sql = 'DELETE FROM person WHERE id in (?)'
  pool.query(sql, [ids])
}

async function getAll() {
  const sql = 'SELECT id, first_name, last_name FROM person'
  const [rows] = await pool.query(sql)
  return rows
}

async function getCount() {
  const sql = 'SELECT count(1) AS count FROM person'
  const [rows] = await pool.query(sql)
  return rows[0].count
}

async function insert({ firstName, lastName }) {
  const sql = 'INSERT INTO person (first_name, last_name) values (?, ?)'
  return pool.query(sql, [firstName, lastName])
}

export {
  deleteMany,
  getAll,
  getCount,
  insert,
}
