import app from './app.js'
import setupDatabaseSchema from '#infra/database/setupSchema'
import logger from '#infra/logger/index'

const PORT_NUMBER = 3000

setupDatabaseSchema().then(() => {
  logger.info('Database schema successfully set up')
  app.listen(PORT_NUMBER, () => {
    logger.info('Server running')
  })
}).catch((error) => {
  logger.error('Failed to set up the database schema', error)
})
