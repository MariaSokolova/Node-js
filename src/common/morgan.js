const morgan = require('morgan');
const { time } = require('./utils');

morgan.token('body', req => {
  const body = { ...req.body };
  delete body.password;
  return JSON.stringify(body);
});

morgan.token('time', () => {
  return time();
});
const morganFormat =
  ':time method: :method, url: :url, status: :status, :response-time ms, body: :body]';

module.exports = { morganFormat };
