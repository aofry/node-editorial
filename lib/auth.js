'use strict';

var jwt = require('jwt-simple');
var HttpStatus = require('http-status-codes');
var logger = require('./logFactory.js');


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

var logout =  function(req, res) {
    logger.debug('logout');

    res.clearCookie('token');

    res.send('logout');
};


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

var ensureAuthenticated = function ensureAuthenticated(req, res, next) {
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

module.exports = function() {

    return { signup: signup,
        login: login,
        logout: logout,
        ensureAuthenticated: ensureAuthenticated
    };
};