const logger = require('./common/winston');
const mongoose = require('mongoose');

const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const usersService = require('./resources/users/user.service');

const users = [
  { name: 'user1', login: 'admin', password: 'admin' },
  { name: 'user2', login: 'login2', password: 'Secret' }
];

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', () => logger.error('MongoDB connection error:'));
db.once('open', () => {
  logger.info('Successfully connect to DB');
  db.dropDatabase();
  users.forEach(user => usersService.create(user));
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});
