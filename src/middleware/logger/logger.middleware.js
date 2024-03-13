import winston from 'winston';

const addLogger = (req, res, next) => {
  req.logger = getLogger();
  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`
  );

  next();
};

const getLogger = () => {
  if (process.env.NODE_ENV === 'production') {
    return createProductionLogger();
  } else {
    return createDevelopmentLogger();
  }
};

const createDevelopmentLogger = () => {
  return winston.createLogger({
    level: 'debug',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
  });
};

const createProductionLogger = () => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'errors.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
};

export { addLogger, getLogger };
