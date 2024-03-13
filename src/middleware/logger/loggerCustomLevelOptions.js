const winston = require('winston');

const logger = winston.createLogger({
    level: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
    },
        colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        debug: 'white',
    },
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`)
      ),
      transports: [
        new winston.transports.Console(),
        
      ],
    });
    
    module.exports = logger;