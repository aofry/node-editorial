//var path = require('path');
//var express = require('express');
//var massive = require("massive");
//var logger = require('morgan');
//var compression = require('compression');

var libconfig = require('./config.js');
var liblogger = require('./logFactory.js');

var authPointService = require('./authPointService.js');
var authFilter = require('./authFilter.js');
//var usersDao = require('./users-dao.js');
/*
var staticMiddlewhere = function(relativeFolderName) {
    return express.static(path.join(__dirname, relativeFolderName), { maxAge: libconfig.STATIC_CACHE_EXPIRE });
};
*/
// https://stormpath.com/blog/how-to-write-middleware-for-express-apps/
// http://stackoverflow.com/questions/16631064/declare-multiple-module-exports-in-node-js

//usersDao.insert({username: "other1", password: "otherpass1"}, function(updatedUser) {
//    console.log("updated user: " + JSON.stringify(updatedUser));
//});

exports.NodeEditorial = function(userConfig) {
    if (userConfig == null)
     userConfig = {};

    //if user did not init the config object then get defaults from config file
    userConfig.tokenAge = userConfig.tokenAge || this.config.TOKEN_AGE_MILLIS;
    userConfig.tokenSecret = userConfig.tokenSecret || this.config.TOKEN_SECRET;

    this.config = libconfig;
    this.logger = liblogger;
    this.authFilter = authFilter;
    this.authPointService = authPointService;

    authPointService.set("TOKEN_AGE_MILLIS", userConfig.tokenAge);
    authPointService.set("TOKEN_SECRET", userConfig.tokenSecret);
    //this.staticMiddlewhere = staticMiddlewhere;

    //TODO add signup middlewhere

    //TODO add util that does it for you here on an express app

    this.logger.debug("Constructed node-editorial");

    return this;
};