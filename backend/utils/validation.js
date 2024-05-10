// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
//my note: a custom middleware designed to handle validation errors
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);//validationResult(req) is called to collect any validation errors.

  if (!validationErrors.isEmpty()) { 
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);
    //Converts the validationErrors into an array and iterates over it. For each error, it adds a new property to the errors object where the property name is the path (field name that has the validation error) and the value is the msg (error message associated with the validation error).
    //add key(error.path) an value(error.msg) pairs to errors that empty object
    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();//if validationErrors.isEmpty(), no validation error
  // If there are no validation errors returned from the validationResult function, invoke the next middleware.
};

module.exports = {
  handleValidationErrors
};