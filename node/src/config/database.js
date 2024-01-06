import { env } from 'node:process'
import 'dotenv/config'

const defaultConfig = {
  host: env.DB_HOST,
  database: env.DB_DATABASE,
  user: env.DB_USER,
  password: env.DB_ROOT_PASSWORD,
}

const poolConfig = {
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  multipleStatements: true,
}

export {
  defaultConfig,
  poolConfig,
}
