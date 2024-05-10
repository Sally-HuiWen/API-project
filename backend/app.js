const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');


const { environment } = require('./config');//.config/index.js
const isProduction = environment === 'production';//isProduction is true or false

const routes = require('./routes');

//Sequelize Error-Handler phase2/part2
const { ValidationError } = require('sequelize');


const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'images')));

// Security Middleware
//CORS isn't needed in production since all of our React and Express resources will come from the same origin.
if (!isProduction) {
    // enable cors only in development
    app.use(cors());//this name as app.use(cors({ origin: '*' }));
    //my note:This is useful during development to allow the application to interact with services or APIs from different origins, facilitating tasks like front-end and back-end development running on different servers or ports.
}
  
// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);
  
// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

app.use(routes); // Connect all the routes

// Phase 2/part1: Catch unhandled requests and forward to error handler.
//This is a regular middleware to create an error!
//It will catch any requests that don't match any of the routes defined and create a server error with a status code of 404.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Phase 2/part2:  catching Sequelize errors and formatting them 
//an error handler middleware
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {//err.errors refers to an array of error objects that Sequelize includes when it throws a ValidationError
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});


// Phase 2/part3: Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,//my note: err.error is  a property of the Error object that is manually assigned to provide additional details about the error
    stack: isProduction ? null : err.stack
  });
});


module.exports = app;