var request = require('supertest');
var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var HttpStatus = require('http-status-codes');

var nodeEditorial = require('../lib/index.js').NodeEditorial({tokenAge : 2000, tokenSecret: 'ajklfhlasdkl456ajf'});


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

        it('should check correct user pass', function (done) {
            request(app)
                .post('/auth/login')
                .send({ email: 'adi', password: 'pass' })
                //.set('Accept', 'application/json')
                //.expect('Content-Type', /json/)
                .expect(function(res){
                    if (res.status != HttpStatus.OK)
                        done();
                    if (res.body.token.length == 0)
                        done();
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

    describe('post signup', function () {
        it('should check new user signup', function (done) {
            request(app)
                .post('/auth/signup')
                .send({ email: 'user' + Math.random(), password: 'pass' })
                //.set('Accept', 'application/json')
                //.expect('Content-Type', /json/)
                .expect(HttpStatus.OK)
                .end(done);
        });

        it('should check wrong user signup with username that already exist', function (done) {
            request(app)
                .post('/auth/signup')
                .send({ email: 'adi', password: 'pass' })
                //.set('Accept', 'application/json')
                //.expect('Content-Type', /json/)
                .expect(HttpStatus.CONFLICT)
                .end(done);
        });
    });

    //TODO test logout
    //TODO test authFilter
    //TODO test static
});
