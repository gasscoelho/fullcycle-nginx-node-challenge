import { env } from 'node:process'
import { pool } from '#infra/database/index'

export default function setupDatabaseSchema() {
  // SQL to create table
  const createTableSql = `
   CREATE TABLE IF NOT EXISTS person (
     id INT NOT NULL AUTO_INCREMENT,
     first_name VARCHAR(255),
     last_name VARCHAR(255),
     PRIMARY KEY (id),
     UNIQUE KEY unique_person (first_name, last_name)
   );`

  // SQL to insert a single record
  const insertRecordSql = `
    INSERT INTO person (first_name, last_name) VALUES ('John', 'Doe') ON DUPLICATE KEY UPDATE id=id;
  `

  let script = createTableSql

  if (env.NODE_ENV === 'production')
    script += insertRecordSql

  return pool.query(script)
}
