export function createPersonRepository(pool) {
  const deleteMany = async (ids) => {
    const sql = 'DELETE FROM person WHERE id in (?)'
    pool.query(sql, [ids])
  }

  const getAll = async () => {
    const sql = 'SELECT id, first_name, last_name FROM person'
    const [rows] = await pool.query(sql)
    return rows
  }

  const getCount = async () => {
    const sql = 'SELECT count(1) AS count FROM person'
    const [rows] = await pool.query(sql)
    return rows[0].count
  }

  const insert = async ({ firstName, lastName }) => {
    const sql = 'INSERT INTO person (first_name, last_name) values (?, ?)'
    return pool.query(sql, [firstName, lastName])
  }

  return {
    deleteMany,
    getAll,
    getCount,
    insert,
  }
}
