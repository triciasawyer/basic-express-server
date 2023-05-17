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


app.get('/', (req, res, next) => {
  res.status(200).send('Proof of life');
});


app.get('/person', validator, (req, res, next) => {
  let {personsName} = req.query;

  try {
    if (personsName){
      res.status(200).send(`The name is ${personsName}`);
    } else {
      res.status(200).send(`Nice to meet you ${personsName}`);
    }
  } catch(error){
    next(error.message);
  }
});


// app.get('/person', validator, (req, res, next) => {
//   console.log('req.query', req.query);
//   res.status(200).send('Something happened');
// });

// This route should use the validator middleware to check the user’s input
// If valid, send a JSON object through the response with the name value in it
// i.e. {"name": "fred" }

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
