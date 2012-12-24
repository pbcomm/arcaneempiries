var mongoose = require('mongoose'),
    schema = require('../libs/schema'),
    clog = require('clog');

mongoose.connect('mongodb://pbcomm:pbcomm@ds045627.mongolab.com:45627/arcaneempire', function(err) {
    if (err) {
        clog.debug('Mongo was unable to connect.');
    }
});

mongoose.connection.on('open', function() {
    clog.debug('Mongo connected.');
});

mongoose.connection.on('close', function() {
    clog.debug('Mongo closed.');
});