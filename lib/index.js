//var Head = require('./head.js').Head,
//    Torso = require('./torso.js').Torso,
//    Arm = require('./arm.js').Arm;
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
//var massive = require("massive");
//var logger = require('morgan');
var compression = require('compression');

var libconfig = require('./config.js');
//var logConfig = require('./logConfig');

exports.NodeEditorial = function() {
    this.config = libconfig;
    //this.head = new Head();
    //this.larm = new Arm();
    //this.rarm = new Arm();
    //this.torso = new Torso();

    return this;
};