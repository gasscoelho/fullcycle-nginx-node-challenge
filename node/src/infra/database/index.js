import mysql from 'mysql2'
import { defaultConfig, poolConfig } from '#config/database'

const pool = mysql.createPool({
  ...defaultConfig,
  ...poolConfig,
}).promise()

export { pool }
