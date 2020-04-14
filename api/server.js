const express = require('express');
const server = express();
//router
const carsRouter = require('../cars/carsRouter');

server.use(express.json());
server.use('/api/cars', carsRouter);

server.get('/', (req, res) => {
  res.send('<h2>Welcome To The DB2 Project API!</h2>');
});

module.exports = server;