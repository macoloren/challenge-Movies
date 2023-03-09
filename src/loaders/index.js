const ExpressServer = require('./server/expressServer');
const sequelize = require('./sequelize');
const config = require('../config');
const logger = require('./logger');

module.exports = async () => {


  try {
    await sequelize.authenticate();
    sequelize.sync({ alter: true}) //crea las tablas en la db automaticamente
    console.log('DB loaded and connected');

    const server = new ExpressServer();
    console.log('Express Loaded');

    server.start();
    console.log(`****Server listening on port: ${config.port}****`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  };

}
