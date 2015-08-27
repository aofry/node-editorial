'use strict';

var express = require('express');
var jwt = require('jwt-simple');
var HttpStatus = require('http-status-codes');
var logger = require('./logFactory.js');
var config = require('./config.js');


var usersDao = require('./users-dao.js');


var authPointService = express();
 /*
var user = {
    username: "adi",
    password: "pass"
};
 */
var login = function(req, res) {
    logger.debug(req.body.email + ' ' + req.body.password);

    usersDao.get(req.body.email, function (user) {
        if (user == undefined || req.body.email != user.username || req.body.password != user.password){
            logger.debug("Wrong email and/or password");
            return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Wrong email and/or password' });
        }

        logger.debug("email and/or password correct");

        var token = createToken(user);
        res.cookie('token', token, {maxAge: config.TOKEN_AGE_MILLIS});
        return res.send({ token: token });
    });

};

authPointService.post("/login", login);

var logout =  function(req, res) {
    logger.debug('logout');

    res.clearCookie('token');

    res.send('logout');
};

authPointService.post("/logout", logout);


var signup = function(req, res) {
    logger.debug(req.body.email + ' ' + req.body.password);

    usersDao.get(req.body.email, function (user) {
        if (user != undefined){
            logger.debug("user already found, can not signup with this email");
            return res.status(HttpStatus.CONFLICT).send({ message: 'Email is already taken' });
        }

        var newUser = {
            username: req.body.email,
            password: req.body.password
        };

        usersDao.insert(newUser, function (updatedUser) {
            //console.log("inserted user: " + JSON.stringify(updatedUser));
            if (updatedUser == null)
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Could not save user' });

            return res.status(HttpStatus.OK).send({ message: 'User created' });
        });

        return res.status(HttpStatus.NOT_IMPLEMENTED).send({ message: 'Could not save user' });
    });
};

authPointService.post("/signup", signup);

//TODO change password

//TODO delete user

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
