const mysql = require('promise-mysql')
const config = require('../config')

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  database: config.database,
  password: config.password,
  port: config.port,
})

const getConnection = () => {
  return connection
}
module.exports = {
  getConnection,
}
