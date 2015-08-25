var request = require('supertest')
var express = require('express');
var assert = require('assert');
var compression = require('compression');
var path = require('path');
var bodyParser = require('body-parser');

var auth = require('../lib/auth.js')();


describe('auth', function () {
    var app = express();
    app.set('port', process.env.PORT || 3000);
    app.use(require('cookie-parser')());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    console.log(auth);
    app.post('/auth/login', auth.login);


    beforeEach(function () {

    });

    describe('post login', function () {
        //console.log("the nodeEditorial:" + nodeEditorial);

        it('should check POST /login', function () {
            //assert(nodeEditorial.config != null, 'conf exist');
        });

    })
});
