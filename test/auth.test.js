var request = require('supertest');
var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var HttpStatus = require('http-status-codes');

var authService = require('../lib/auth.js');


describe('auth', function () {
    var app = express();
    app.set('port', process.env.PORT || 3000);
    app.use(require('cookie-parser')());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/auth/', authService);


    beforeEach(function () {

    });

    describe('post login', function () {
        //console.log("the nodeEditorial:" + nodeEditorial);

        it('should check correct user pass', function (done) {
            request(app)
                .post('/auth/login')
                .send({ email: 'adi', password: 'pass' })
                //.set('Accept', 'application/json')
                //.expect('Content-Type', /json/)
                .expect(HttpStatus.OK, done);
        });
    })
});
