var mongoose = require('mongoose'),
    clog = require('clog'),
    World = mongoose.model('World'),
    Tiles = mongoose.model('Tiles');

/*
 * GET tiles
 */
exports.listView = function(req, res) {
    var
        alliances = [],
        players = [];

    Tiles.find({})
        .distinct('alliance.name', function(e, doc) {
            alliances = doc;
        })
        .distinct('user.n', function(e, doc) {
            players = doc;
        })
        .find({})
        .exec(function(e, doc) {
            res.render('index', {
                title: 'More Tiles',
                players: players.sort(),
                alliances: alliances.sort()
            });
        });
};

exports.list = function(req, res){
    Tiles.find({})
        .sort({ x: 1, y: 1 })
        .populate('worldId')
        .exec(function(e, doc) {
            res.json(doc);
        });
};

exports.listByPlayer = function(req, res){
    var player = req.params.player;

    Tiles.find({ "user.n": player })
        .populate('worldId')
        .sort({ tileType:-1, x: 1, y: 1 })
        .exec(function(e, doc) {
            if (doc.length) {
                res.render('list', {
                    title: 'Player Island List (' + doc.length + '): ' + player + ' (' + doc[0].user.m + ')',
                    tiles: doc
                });
            } else {
                res.json({});
            }
        });
};

exports.listByAlliance = function(req, res){
    var alliance = req.params.alliance;

    Tiles.find({ "alliance.name": alliance })
        .populate('worldId')
        .sort({ 'user.n':1, x: 1, y: 1, tyleType:-1 })
        .exec(function(e, doc) {
            res.render('list', {
                title: 'Alliance Player List (' + doc.length + '): ' + alliance + ' (' + doc[0].alliance.might + ')',
                tiles: doc
            });
        });
};