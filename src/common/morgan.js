const morgan = require('morgan');
const { time } = require('./utils');

morgan.token('body', req => {
  const body = { ...req.body };
  delete body.password;
  return JSON.stringify(body);
});

morgan.token('params', req => {
  const params = { ...req.query };
  return JSON.stringify(params);
});

morgan.token('time', () => {
  return time();
});
const morganFormat =
  ':time method: :method, url: :url, status: :status, queryParams: :params :response-time ms, body: :body]';

module.exports = { morganFormat };
