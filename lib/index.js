var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
//var massive = require("massive");
//var logger = require('morgan');
var compression = require('compression');

var libconfig = require('./config.js');
var liblogger = require('./logFactory.js');

var authPointService = require('./authPointService.js');
var authFilter = require('./authFilter.js');


// https://stormpath.com/blog/how-to-write-middleware-for-express-apps/
// http://stackoverflow.com/questions/16631064/declare-multiple-module-exports-in-node-js

exports.NodeEditorial = function() {
    this.config = libconfig;
    this.logger = liblogger;
    this.authFilter = authFilter;
    this.authPointService = authPointService;

    //TODO add ensureAuthenticated middlewhere
    //TODO add login middlewhere
    //TODO add logout middlewhere
    //TODO add signup middlewhere

    //TODO add util that does it for you here on an express app

    this.logger.debug("Constructed node-editorial");

    return this;
};