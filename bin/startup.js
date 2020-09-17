const logger = require('../src/log')
const process = require('../src/process')

process().catch(e => logger.error(e));
