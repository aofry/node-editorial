'use strict';

var jwt = require('jwt-simple');
var HttpStatus = require('http-status-codes');
var logger = require('./logFactory.js');
var config = require('./config.js');

var authFilter = function ensureAuthenticated(req, res, next) {
    var token = req.cookies.token;
    if (!token) {
        return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Please make sure your request has an Authorization header' });
    }

    var payload;
    try {
        payload = jwt.decode(token, config.TOKEN_SECRET);
    }
    catch(err) {
        return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Bad Token' });
    }

    if (payload.exp <= (new Date().getTime())) {
        return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Token has expired' });
    }
    req.user = payload.sub;
    next();
};

module.exports = authFilter;
