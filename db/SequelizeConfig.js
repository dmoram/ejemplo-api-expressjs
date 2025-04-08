const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelizeInstance = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
  host: 'localhost', // o '127.0.0.1'
  dialect: 'mysql',
  port: 3306, // Puerto por defecto de MySQL
});

module.exports = sequelizeInstance;
