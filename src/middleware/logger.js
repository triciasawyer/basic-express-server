'use strict';

function logger (req, res, next){
  console.log(`REQUEST: ${req.method}, ${req.baseUrl}`);
  next();
}

module.exports = logger;
