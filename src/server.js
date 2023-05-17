'use strict';

const express = require ('express');
const cors = require('cors');

const logger = require('./middleware/logger');
const validator = require('./middleware/validator');

const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');



const app = express();
// middleware
app.use(cors());
app.use(express.json());


//add logger use
app.use(logger);
app.use(validator);



app.get('/', (req, res, next) => {
  res.status(200).send('Proof of life');
});


// app.get('/person', logger, (req, res, next) => {

// });


app.get('/person/:name', validator, (req, res, next) => {
  const name = req.query.name;

  if (!name) {
    res.status(500).send('Internal Server Error');
  } else {
    const response = { 'name': 'Tricia' };
    res.json(response);
  }
});


// app.get('/person', validator, (req, res, next) => {
//   console.log('req.query', req.query);
//   res.status(200).send('Something happened');
// });



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
