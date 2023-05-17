'use strict';

const express = require ('express');
const cors = require('cors');

const logger = require('./middleware/logger/logger');
const validator = require('./middleware/validator/validator');

const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');


const app = express();
// middleware
app.use(cors());
app.use(express.json());
app.use(logger);


app.get('/', (req, res, next) => {
  res.status(200).send('Proof of life');
});


app.get('/person', validator, (req, res, next) => {
  res.status(200).json(req.query.name);
});


app.get('/success', (req, res, next) => {
  res.status(200).send('Success!');
});

app.get('/bad', (req, res, next) => {
  next('There is an error!');
});


app.use('*', notFound);
app.use(errorHandler);


const start = (port) => app.listen(port, () => console.log('listening on port:', port));
module.exports= { start, app };
