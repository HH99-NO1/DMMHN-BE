const { createLogger, transports, format } = require("winston");
const { combine, label, colorize, timestamp, printf, simple } = format;
const winstonDaily = require("winston-daily-rotate-file");

const logDir = "logs";

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */

const printFormat = printf(({ label, timestamp, level, message }) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});

const logFormat = {
  file: combine(
    label({
      label: "떨면 뭐하니",
    }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:dd",
    }),
    printFormat
  ),
  console: combine(colorize(), simple()),
};

const logger = createLogger({
  transports: [
    new winstonDaily({
      format: logFormat.file,
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
    }),
    new winstonDaily({
      format: logFormat.file,
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.error.log`,
      maxFiles: 30,
    }),
  ],
  // exceptionHandlers: [
  //   new winstonDaily({
  //     format: logFormat.file,
  //     level: "error",
  //     datePattern: "YYYY-MM-DD",
  //     dirname: logDir,
  //     filename: `%DATE%.exception.log`,
  //     maxFiles: 30,
  //   }),
  // ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      level: "info",
      format: logFormat.console,
    })
  );
}

module.exports = logger;
