'use strict';

var jwt = require('jwt-simple');
var HttpStatus = require('http-status-codes');
var logger = require('./logFactory.js');
var config = require('./config.js');
var express = require('express');


var authPointService = express();

var user = {
    username: "adi",
    password: "pass"
};

var login = function(req, res) {
    logger.debug(req.body.email + ' ' + req.body.password);

    if (req.body.email != user.username || req.body.password != user.password){
        logger.debug("Wrong email and/or password");
        return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Wrong email and/or password' });
    }

    logger.debug("email and/or password correct");

    var token = createToken(user);
    res.cookie('token', token, {maxAge: config.TOKEN_AGE_MILLIS});
    res.send({ token: token });
};

authPointService.post("/login", login);

var logout =  function(req, res) {
    logger.debug('logout');

    res.clearCookie('token');

    res.send('logout');
};

authPointService.post("/logout", logout);


var signup = function(req, res) {
    /*
     User.findOne({ email: req.body.email }, function(err, existingUser) {
     if (existingUser) {
     return res.status(409).send({ message: 'Email is already taken' });
     }
     var user = new User({
     displayName: req.body.displayName,
     email: req.body.email,
     password: req.body.password
     });
     user.save(function() {
     res.send({ token: createToken(user) });
     });
     });
     */
};

function createToken(user) {
    var currentDate = new Date();

    var payload = {
        sub: user.username,
        iat: currentDate.getTime(),
        exp: currentDate.getTime() + config.TOKEN_AGE_MILLIS
    };

    logger.debug(payload);
    logger.debug(jwt.encode(payload, config.TOKEN_SECRET));
    return jwt.encode(payload, config.TOKEN_SECRET);
}

module.exports = authPointService;
