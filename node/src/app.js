import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { engine } from 'express-handlebars'
import apiMainController from '#routes/api/index'
import clientMainController from '#routes/client/index'

// Dependencies
import { pool } from '#infra/database/index'
import { createPersonRepository } from '#infra/repository/personRepository'
import createCheckPeopleMiddleware from '#middlewares/checkPeople'
import createAddPersonUsecase from '#usecase/addPerson'
import createBulkDeletePeopleUsecase from '#usecase/bulkDeletePeople'
import createGetPeopleUsecase from '#usecase/getPeople'

const personRepository = createPersonRepository(pool)
const checkPeople = createCheckPeopleMiddleware(personRepository)
const addPerson = createAddPersonUsecase(personRepository)
const bulkDeletePeople = createBulkDeletePeopleUsecase(personRepository)
const getPeople = createGetPeopleUsecase(personRepository)
//

const apiRoutes = apiMainController(addPerson, bulkDeletePeople)
const clientRoutes = clientMainController(getPeople, checkPeople)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Improve security by setting default HTTP response headers
app.use(helmet())

// View engine setup
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: `${__dirname}/views/layouts/`,
  partialsDir: `${__dirname}/views/partials/`,
}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// JSON body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Static file serving
app.use(express.static(path.join(__dirname, 'public')))

// Routes setup
app.use(apiRoutes)
app.use(clientRoutes)
app.use((req, res) => {
  res.status(404).render('404')
})

export default app
