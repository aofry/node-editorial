'use strict';

// http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
var winston = require('winston');

//var config = require('./config.js');

winston.emitErrs = true;

module.exports = function(config) {
  if (config == null) {
    config = {logDir: '.'};
  }

  if (config.logDir == null)
    config.logDir = '.';

  if (config.fileName == null)
    config.fileName = 'logger.log';

  var logTransport = [
    new winston.transports.File({
      level: 'debug',
      filename: config.logDir + '/' + config.fileName,
      handleExceptions: true,
      json: false,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: true
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ];
/*
  if (config.LOGGLY_TOKEN != null && config.LOGGLY_SUBDOMAIN != null) {
    require('winston-loggly');
    logTransport.push(new winston.transports.Loggly({
      level: 'info',
      token: config.LOGGLY_TOKEN,
      subdomain: config.LOGGLY_SUBDOMAIN,
      tags: ["NodeJS"],
      json: true
    }));
  }
*/
  var logger = new winston.Logger({
    transports: logTransport,
    exitOnError: false
  });

  return logger;
};
/*
module.exports.stream = {
  write: function (message) {
    logger.info(message);
  }
};
*/