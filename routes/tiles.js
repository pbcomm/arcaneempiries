var mongoose = require('mongoose'),
    clog = require('clog'),
    World = mongoose.model('World'),
    Tiles = mongoose.model('Tiles');


/*
 * GET tiles
 */

exports.listView = function(req, res){
    Tiles.find({})
        .sort({ x: 1, y: 1 })
        .populate('worldId')
        .exec(function(e, doc){
            res.render('index', {
                title: 'More Tiles',
                tiles: doc
            });
        });
};

exports.list = function(req, res){
    Tiles.find({})
        .populate('worldId')
        .exec(function(e, doc){
            res.json(doc);
        });
};

exports.listByUser = function(req, res){
    var user = req.params.user;

    Tiles.find({ "userId.n": user })
        .populate('worldId')
        .exec(function(e, doc){
            res.json(doc);
        });
};

exports.listByAlliance = function(req, res){
    var alliance = req.params.alliance;

    Tiles.find({ "allianceId.name": alliance })
        .populate('worldId')
        .exec(function(e, doc){
            res.json(doc);
        });
};