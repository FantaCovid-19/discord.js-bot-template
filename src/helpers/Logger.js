const pino = require('pino');
const pretty = require('pino-pretty');

const levels = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

const streams = pretty({
  colorize: true,
  ignore: 'pid,hostname',
  translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
  customLevels: levels,
  singleLine: false,
  hideObject: true,
  customPrettifiers: {
    time: (timestamp) => `[⌚ ${timestamp}]`,
    level: (logLevel, key, log, { labelColorized }) => {
      if (logLevel === '10') {
        return `[📝 ${labelColorized}]`;
      } else if (logLevel === '20') {
        return `[🐞 ${labelColorized}]`;
      } else if (logLevel === '30') {
        return `[ℹ️ ${labelColorized}]`;
      } else if (logLevel === '40') {
        return `[⚠️  ${labelColorized}]`;
      } else if (logLevel === '50') {
        return `[❌ ${labelColorized}]`;
      } else if (logLevel === '60') {
        return `[🚨 ${labelColorized}]`;
      }
    },
  },
});

const logger = pino.default(
  {
    name: 'Bot',
    customLevels: levels,
    useOnlyCustomLevels: true,
    level: 'debug',
  },
  pino.multistream([
    {
      level: 'info',
      stream: streams,
    },
    {
      level: 'debug',
      stream: pino.destination({
        dest: './logs/debug.log',
        sync: true,
        mkdir: true,
      }),
    },
    {
      level: 'error',
      stream: pino.destination({
        dest: './logs/error.log',
        sync: true,
        mkdir: true,
      }),
    },
    {
      level: 'fatal',
      stream: pino.destination({
        dest: './logs/fatal.log',
        sync: true,
        mkdir: true,
      }),
    },
  ])
);

module.exports = class Logger {
  /**
   * Log a message
   * @param {string} message
   */
  static log(message) {
    logger.info(message);
  }

  /**
   * Log a warning message
   * @param {string} message
   * @param {object} [warn]
   */
  static warn(message, warn) {
    logger.warn(warn, `${message}: ${warn?.message}`);
  }

  /**
   * Log an error message
   * @param {string} message
   * @param {object} [err]
   */
  static error(message, err) {
    if (err) {
      logger.error(err, `${message}: ${err?.message}`);
    } else {
      logger.error(message);
    }
  }

  /**
   * Log a debug message
   * @param {string} message
   */
  static debug(message) {
    logger.debug(message);
  }
};
