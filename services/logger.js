var winston = require('winston');

module.exports = new winston.Logger({
    transports :[
        new winston.transports.File({
            level: "info",
            filename: "logs/api.log",
            maxsize: 100000,
            maxFiles: 10
        })
    ]
});
