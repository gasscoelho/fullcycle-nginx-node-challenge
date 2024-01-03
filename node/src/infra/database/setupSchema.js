import { pool } from '#infra/database/index'

export default function setupDatabaseSchema() {
  const sql = `
    CREATE TABLE IF NOT EXISTS person (
      id INT NOT NULL AUTO_INCREMENT,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      PRIMARY KEY (id)
    )`
  return pool.query(sql)
}
