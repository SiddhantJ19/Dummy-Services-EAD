const express = require('express');
const body_parser = require('body-parser');

const router = require('./src/router');
const {handleError} = require('./src/error');

// initializing raygun adapter instance
const { init, errorHandler, emitError} = require("../../raygun-adapter-nodejs/src/index")

init({
  ticket: '840225FD2121BACB85A8A99C71DCDE84B18D0E07F015D01C43',
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
