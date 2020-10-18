const winston = require('winston');

const options = {
  file: {
    level: 'info',
    filename: 'src/logs/app-info.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
  },
  fileError: {
    level: 'error',
    filename: 'src/logs/app-error.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'error',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.File(options.fileError),
    new winston.transports.Console(options.console)
  ],

  exitOnError: false
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;
