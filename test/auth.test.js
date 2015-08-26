var request = require('supertest');
var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var HttpStatus = require('http-status-codes');

var nodeEditorial = require('../lib/index.js').NodeEditorial();


describe('auth', function () {
    var app = express();
    app.set('port', process.env.PORT || 3000);
    var cookieParser = require('cookie-parser');
    app.use(cookieParser());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/auth/', nodeEditorial.authPointService);
    app.use('/api/*', nodeEditorial.authFilter);


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
                .expect(function(res){
                    if (res.status != HttpStatus.OK)
                        return true;
                    if (res.body.token.length == 0)
                        return true;
                })
                .end(done);
        });

        it('should check wrong pass', function (done) {
            request(app)
                .post('/auth/login')
                .send({ email: 'adi', password: 'other' })
                .expect(HttpStatus.UNAUTHORIZED, done);
        });

        it('should check wrong user', function (done) {
            request(app)
                .post('/auth/login')
                .send({ email: 'bla', password: 'other' })
                .expect(HttpStatus.UNAUTHORIZED, done);
        });
    });

    //TODO test logout
    //TODO test signup
    //TODO test authFilter
    //TODO test static
});
