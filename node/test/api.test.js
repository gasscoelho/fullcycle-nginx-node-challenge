import { env } from 'node:process'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { GenericContainer, Wait } from 'testcontainers'
import request from 'supertest'

import app from '../src/app.js'
import { pool } from '#infra/database/index'
import setupDatabaseSchema from '#infra/database/setupSchema'

describe('application', () => {
  let mysqlContainer

  beforeAll(async () => {
    // Launch a container for the test db
    mysqlContainer = await new GenericContainer('mysql:8')
      .withNetworkMode('nginx-with-node_appnet') // This might not work in a CI pipeline
      .withNetworkAliases('db_test')
      .withEnvironment({ MYSQL_DATABASE: env.DB_DATABASE, MYSQL_ROOT_PASSWORD: env.DB_ROOT_PASSWORD })
      .withWaitStrategy(Wait.forLogMessage('port: 3306  MySQL Community Server'))
      .start()
    await setupDatabaseSchema()
  }, 60000)

  afterAll(async () => {
    await mysqlContainer.stop()
  })

  describe('route: /api/person', () => {
    beforeEach(async () => {
      await pool.query('DELETE FROM person')
    })

    afterEach(async () => {
      await pool.query('DELETE FROM person')
    })

    it('should create a new person', async () => {
      const response = await request(app)
        .post('/api/person')
        .send({ firstName: 'John', lastName: 'Doe' })
        .expect('Content-Type', /json/)
        .expect(200)

      const data = response.body
      expect(data).toEqual({
        first_name: 'John',
        last_name: 'Doe',
      })
    })

    it('should not create a person that already exists', async () => {
      const person = { firstName: 'Jane', lastName: 'Doe' }
      await pool.query('INSERT INTO person (first_name, last_name) VALUES (?, ?)', [person.firstName, person.lastName])

      await request(app)
        .post('/api/person')
        .send(person)
        .expect(409)

      const [rows] = await pool.query('SELECT * FROM person WHERE first_name = ? AND last_name = ?', [person.firstName, person.lastName])
      expect(rows.length).toBe(1)
    })
  })

  describe('route: /api/people', () => {
    let peopleIds

    beforeEach(async () => {
      await pool.query('DELETE FROM person')
      await pool.query('INSERT INTO person (first_name, last_name) VALUES (?, ?)', ['Alice', 'Smith'])
      await pool.query('INSERT INTO person (first_name, last_name) VALUES (?, ?)', ['Bob', 'Johnson'])
      const [rows] = await pool.query('SELECT id FROM person')
      peopleIds = rows.map(row => row.id)
    })

    afterEach(async () => {
      await pool.query('DELETE FROM person')
    })

    it('should delete multiple people', async () => {
      await request(app)
        .delete('/api/people')
        .send({ ids: peopleIds })
        .expect(204)

      const [rows] = await pool.query('SELECT * FROM person')
      expect(rows.length).toBe(0)
    })
  })
})
