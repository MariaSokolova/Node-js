const winston = require('winston');
const { combine, timestamp, prettyPrint } = winston.format;

const format = combine(timestamp(), prettyPrint());

const options = {
  file: {
    format,
    level: 'info',
    filename: 'src/logs/app-info.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
  },
  fileUnhandled: {
    format,
    level: 'error',
    filename: 'src/logs/exceptions-error.log',
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxsize: 1024 * 5000,
    maxFiles: 5,
    colorize: false
  },
  fileError: {
    format,
    level: 'error',
    filename: 'src/logs/app-error.log',
    handleExceptions: true,
    handleRejections: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
  },
  console: {
    format,
    level: 'info',
    handleExceptions: true,
    handleRejections: true,
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
  exceptionHandlers: [
    new winston.transports.File(options.fileUnhandled),
    new winston.transports.Console(options.console)
  ],
  exitOnError: true
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;
