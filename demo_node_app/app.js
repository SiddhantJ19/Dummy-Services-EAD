const express = require('express');
const body_parser = require('body-parser');

const router = require('./src/router');
const {handleError} = require('./src/error');

// initializing raygun adapter instance
const { init, errorHandler, emitError} = require("../raygun-adapter-nodejs/src/index")

init({
  ticket: '7BB3452B266EDEBF68FDEBB73A75C4A1A90F89C8D1B3E224A9',
  instance: 'http://localhost:2800',
});

const app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

app.use(router);

// raygun middleware
app.use(errorHandler);

// custom error middleware
app.use((error, req, res, next) => {
  res.status(error.statusCode).send(handleError(error));
});

module.exports = app;
