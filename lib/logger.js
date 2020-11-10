const log4js = require("log4js");

log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        combined: { type: 'dateFile', filename: './logs/combined.log' },
    },
    categories: {
        default: { appenders: ['out', 'combined'], level: 'info' }
    }
})

const logger = log4js.getLogger();

module.exports = logger