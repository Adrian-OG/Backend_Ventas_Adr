const config = require('dotenv')

config.config()

const cr = {
  host: process.env.HOST || '',
  user: process.env.USER || '',
  database: process.env.DATABASE || '',
  password: process.env.PASSWORD || '',
  port: process.env.PORT || '',
}
module.exports = cr
