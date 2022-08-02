const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const clienteRoutes = require('./routes/cliente.route')
const cors = require('cors')
const app = express()

//Middlewares
app.set('port', 4000)
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({ type: 'application/json' }))
//Routes
app.use('/api/clientes', clienteRoutes)

//Settings

module.exports = app
