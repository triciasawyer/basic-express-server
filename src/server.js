'use strict';

const express = require ('express');
const cors = require('cors');




const app = express();

// middleware
app.use(cors());
app.use(express.json());



app.get('/', (req, res, next) => {
  res.status(200).send('Proof of life');
});



app.get('/')
