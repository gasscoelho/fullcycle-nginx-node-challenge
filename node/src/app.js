import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { engine } from 'express-handlebars'
import apiRoutes from '#routes/api/index'
import clientRoutes from '#routes/client/index'

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
