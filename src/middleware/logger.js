'use strict';

const logger = (req, res, next) => {
  console.log('logger middleware hit!');
  next();
};

module.exports = logger;
