'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const { sequelize, models } = require('./models');
const User = require('./models').User;
const Course = require('./models').Course;

// Constructs a router instance.
// const router = express.Router();

const userRoute = require('./routes/user.js');
const courseRoute = require('./routes/course.js')

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// CORS import
const cors = require('cors');

// create the Express app
const app = express();

app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// Support cross-origin resource sharing
app.use(cors());

// TODO setup your api routes here

// Tests database connection (SQLite)
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.info('Connection established successfully');
  } catch (error) {
    console.error('Error establishing database connection.', error);
  }
});

// Route Management
app.use('/api', userRoute);
app.use('/api', courseRoute);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  
  res.json({
    message: 'Welcome to the REST API project!',
  });
});



// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
// sequelize.sync()
//   .then(() => {
//     const server = app.listen(app.get('port'), () => {
//     console.log(`Express server is listening on port ${server.address().port}`);
//     });
//   });
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
 