'use strict';


module.exports = (req, res, next) => {
  if (req.query.name) {
    next();
  } else {
    next ('Query parameter (or query string) must be name');
  }
};

