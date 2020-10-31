const express = require('express');
const morgan = require('morgan');
const path = require('path');
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');

const apiErrorHandler = require('./error/api-error-handler');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const ApiError = require('./error/ApiError');
const logger = require('./common/winston');
const { morganFormat } = require('./common/morgan');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
