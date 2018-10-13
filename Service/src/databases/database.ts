import * as mySQL from 'mysql'
import { config } from '../configs/config'

const connection = mySQL.createPool({
  connectionLimit: 100,
  user: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  debug: false,
  multipleStatements: true
})

export default connection;
