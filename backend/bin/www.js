#!/usr/bin/env node
// backend/bin/www
//my note: Conventionally, the bin/www file in an Express server is the entry file or the starting point to start the Express server.
// Import environment variables
require('dotenv').config();

const { port } = require('../config');//my note: ../config.index.js

const app = require('../app');
const db = require('../db/models');

// Check the database connection before starting the app
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection success! Sequelize is ready to use...');

    // Start listening for connections
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => {
    console.log('Database connection failure.');
    console.error(err);
  });

  //my note: This code effectively sets up a Sequelize database connection and, upon successful connection, starts an Express.js server that listens on a specified port. 