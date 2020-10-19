const ApiError = require('./ApiError');
const { time } = require('../common/utils');
const logger = require('../common/winston');

function apiErrorHandler(err, req, res, next) {
  logger.error(
    `${time()} - ${err.code || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    }`
  );

  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }

  res.status(500).json('something went wrong');
  next();
}

module.exports = apiErrorHandler;
