'use strict';

const express = require ('express');
const cors = require('cors');
const errorHandler = require(./);




const app = express();

// middleware
app.use(cors());
app.use(express.json());



app.get('/', (req, res, next) => {
  res.status(200).send('Proof of life');
});



app.get('/hiPath/:name', (req, res, next) => {
  console.log('params', req.query);
  res.status(200).send('Something happened');
});


app.use(errorHandler);
