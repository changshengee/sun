const path = require('path');
const log4js = require('log4js');
const {logConfig} = require('../config/config');

const config = {
    /**
     * 日志路径
     */
    base: path.resolve(__dirname, '../logs'),
    /**
     * 日志级别
     */
    level: logConfig.level,
    /**
     * 默认日志路径
     */
    default: '/out',
    //日志文件保存天数
    /**
     * 日志文件保存天数
     */
    daysToKeep: 8
};


log4js.configure({
    pm2: true,
    appenders: {
        out: {type: 'stdout'},
        'error-file': {
            type: 'dateFile',
            filename: config.base + config.default + '/error',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            daysToKeep: config.daysToKeep
        },
        'info-file': {
            type: 'dateFile',
            filename: config.base + config.default + '/info',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            daysToKeep: config.daysToKeep
        },
        'debug-file': {
            type: 'dateFile',
            filename: config.base + config.default + '/debug',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            daysToKeep: config.daysToKeep
        },
        error: {
            type: 'logLevelFilter',
            appender: 'error-file',
            level: 'error'
        },
        info: {
            type: 'logLevelFilter',
            appender: 'info-file',
            level: 'info'
        },
        debug: {
            type: 'logLevelFilter',
            appender: 'debug-file',
            level: 'debug'
        }
    },
    categories: {
        default: {
            appenders: ['out', 'info', 'error', 'debug'],
            level: config.level
        }
    }
});


module.exports = log4js.getLogger();

