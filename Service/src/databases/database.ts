import * as mySQL from 'mysql'
import { config } from '../configs/config'

const connection = mySQL.createConnection({
  user: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  debug: false
})

connection.connect();

export default connection;
