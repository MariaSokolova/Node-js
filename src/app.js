const express = require('express');
const morgan = require('morgan');
const path = require('path');
const YAML = require('yamljs');

const apiErrorHandler = require('./error/api-error-handler');
const swaggerUI = require('swagger-ui-express');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const ApiError = require('./error/ApiError');
const logger = require('./common/winston');
const { time } = require('./common/utils');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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

app.use(morgan(morganFormat, { stream: logger.stream }));
app.use(morgan(morganFormat));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.all('*', (req, res, next) => {
  next(
    ApiError.notFound(`Can't find path "${req.originalUrl}" on this server`)
  );
});

app.use(apiErrorHandler);

module.exports = app;
