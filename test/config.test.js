var assert = require('assert');
var nodeEditorial = require('../lib/index.js').NodeEditorial();


describe('NodeEditorial', function () {
    //var arr;

    beforeEach(function () {
        //arr = [1, 2, 3];
    })

    describe('config', function () {
        //console.log("the nodeEditorial:" + nodeEditorial);

        it('should should check that config exist', function () {
            assert(nodeEditorial.config != null, 'conf exist');
        });



    })
})
