var assert = require('assert');
var nodeEditorial = require('../lib/index.js').NodeEditorial();


describe('node-editorial', function () {

    //beforeEach(function () {

    //});

    describe('logger', function () {
        it('should check that logger exist through nodeEditorial', function () {
            assert(nodeEditorial.logger != null, 'logger exist');
            nodeEditorial.logger.debug("testing logger");
        });

        it('should check that logger exist on its own', function () {
            var log = require('../lib/logFactory.js');
            assert(log != null, 'logger exist on its won');
            log.debug("testing logger as a simple loaded obj");
        });

    })
});
