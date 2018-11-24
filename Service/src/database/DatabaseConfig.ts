import { Sequelize } from 'sequelize-typescript';
import { config } from '../config/config'

let sequelize = new Sequelize({
    database: config.DB_NAME,
    dialect: 'mysql',
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    storage: ':memory:',
    modelPaths: [__dirname + '/model']
});