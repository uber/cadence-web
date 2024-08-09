/*
  This file is a configuration file for the next-logger library,
  which patches Next's logger to output NDJSON to stdout using Pino.

  next-logger uses its own Pino logger by default, but for a unified logging
  experience, we override it to use the same Pino logger as utils/logger.
*/

const {
  getBaseLogger: logger,
} = async () => await import('./src/utils/logger/logger')();

module.exports = {
  logger,
};
