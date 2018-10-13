import * as mySQL from 'mysql'
import * as CONFIG from './configs/config.json'

const connection = mySQL.createPool({
  connectionLimit: 100,
  user: CONFIG.DB_USERNAME,
  password: CONFIG.DB_PASSWORD,
  database: CONFIG.DB_NAME,
  debug: false
})

export default connection;
