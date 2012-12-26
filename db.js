/**
 * Created with JetBrains WebStorm.
 * User: Paul.Bronshteyn
 * Date: 12/19/12
 * Time: 7:36 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var events = require('events');
var updateEmitter = new events.EventEmitter();

var defaultWorld = 11;

mongoose.connect('mongodb://pbcomm:pbcomm@ds045627.mongolab.com:45627/arcaneempire');
module.exports.db = mongoose.connection;

var
    World = new Schema({
        worldId: { type: Number, index: true },
        worldName: String,
        language: { type: String, default: 'en' }
    }),

    Requests = new Schema({
        worldId: { type: Schema.Types.ObjectId, ref: 'World' },
        data: String,
        lastUpdate: { type: Date, default: Date.now }
    }),

    TileType = new Schema({
        id: { type: Number, index: true },
        name: String
    }),

    Alliance = new Schema({
        worldId: { type: Schema.Types.ObjectId, ref: 'World' },
        id: { type: Number, index: true },
        name: String,
        might: Number
    }),

    Player = new Schema({
        worldId: [{ type: Schema.Types.ObjectId, ref: 'World' }],
        id: Number,
        name: String,
        level: Number,
        alliance: { type: Schema.Types.ObjectId, ref: 'Alliance' },
        might: Number,
        s: String,
        w: String,
        i: String
    }),

    Tiles = new Schema({
        worldId: { type: Schema.Types.ObjectId, ref: 'World' },
        id: Number,
        x: Number,
        y: Number,
        tileType: Number, //{ type: Schema.Types.ObjectId, ref: 'TileType' },
        originalLevel: Number,
        level: Number,
        cityId: Number,
        cityName: String,
        userId: {}, //{ type: Schema.Types.ObjectId, ref: 'Player' },
        allianceId: {}, //{ type: Schema.Types.ObjectId, ref: 'Alliance' },
        provinceId: Number,
        blockId: Number
    });

var model = {
    World: mongoose.model('World', World),
    Requests: mongoose.model('Requests', Requests),
    Player: mongoose.model('Player', Player),
    Alliance: mongoose.model('Alliance', Alliance),
    TileType: mongoose.model('TileType', TileType),
    Tiles: mongoose.model('Tiles', Tiles)
};

module.exports.model = model;
module.exports.updateEmitter = updateEmitter;

Tiles.pre('update', function(next) {
    console.log(this, arguments);
    next();
});

var types = [
    {tileType:0,name:'Volcano'},
    {tileType:10,name:'Verdant Isle'},
    {tileType:11,name:'Lagoon'},
    {tileType:20,name:'Wooded Isle'},
    {tileType:30,name:'Crystal Reef'},
    {tileType:40,name:'Rocky Isle'},
    {tileType:51,name:'Imperial Fort'}
];

var worlds = {"ok":true,"worlds":[
    {"worldId":"1","worldName":"Berra1 (English)","language":"en","worldDate":"Jul 6th 2012","createDate":"2012-07-06 09:16:17","isTestWorld":false,"population":2},
    {"worldId":"2","worldName":"Drake2 (English)","language":"en","worldDate":"Jul 6th 2012","createDate":"2012-07-06 09:16:34","isTestWorld":false,"population":2},
    {"worldId":"3","worldName":"Howell3 (English)","language":"en","worldDate":"Jul 6th 2012","createDate":"2012-07-06 09:17:22","isTestWorld":false,"population":2},
    {"worldId":"4","worldName":"Amenta4 (English)","language":"en","worldDate":"Jul 6th 2012","createDate":"2012-07-06 09:17:29","isTestWorld":false,"population":2},
    {"worldId":"5","worldName":"Swift5 (English)","language":"en","worldDate":"Jul 6th 2012","createDate":"2012-07-06 09:17:39","isTestWorld":false,"population":2},
    {"worldId":"6","worldName":"Ferris6 (English)","language":"en","worldDate":"Jul 6th 2012","createDate":"2012-07-06 09:17:45","isTestWorld":false,"population":2},
    {"worldId":"7","worldName":"Tobin7 (English)","language":"en","worldDate":"Jul 6th 2012","createDate":"2012-07-06 09:17:59","isTestWorld":false,"population":2},
    {"worldId":"8","worldName":"Elam8 (English)","language":"en","worldDate":"Jul 6th 2012","createDate":"2012-07-06 09:18:04","isTestWorld":false,"population":2},
    {"worldId":"11","worldName":"Pierce11 (Français)","language":"fr","worldDate":"Jul 6th 2012","createDate":"2012-07-06 09:18:04","isTestWorld":false,"population":2},
    {"worldId":"12","worldName":"Todaro12 (Italiano)","language":"it","worldDate":"Jul 6th 2012","createDate":"2012-07-06 09:19:03","isTestWorld":false,"population":2},
    {"worldId":"13","worldName":"Nunez13 (Deutsch)","language":"de","worldDate":"Jul 6th 2012","createDate":"2012-07-06 09:19:15","isTestWorld":false,"population":2},
    {"worldId":"14","worldName":"Stavins14 (Espa\u00f1ol)","language":"es","worldDate":"Jul 6th 2012","createDate":"2012-07-06 09:19:24","isTestWorld":false,"population":2},
    {"worldId":"15","worldName":"Perlis15 (Br. Portuguese)","language":"pt","worldDate":"Jul 6th 2012","createDate":"2012-07-06 09:19:32","isTestWorld":false,"population":2},
    {"worldId":"19","worldName":"Perrine19 (Espa\u00f1ol)","language":"es","worldDate":"Jul 6th 2012","createDate":"2012-07-06 09:19:50","isTestWorld":false,"population":0}
]};


var updateWorlds = function() {
    worlds.worlds.forEach(function(item) {
        model.World.update({ worldId: item.worldId }, item, { upsert: true }, function(e) {
            if (e) {
                console.log(e);
            }
        });
    });
};

var updateTypes = function() {
    types.forEach(function(item) {
        model.TileType.update({ tileType: item.tileType}, item, { upsert: true }, function(e) {
            if (e) {
                console.log(e);
            }
        });
    });
};

updateWorlds();
updateTypes();

module.exports.updateAlliances = function(alliances, power) {
    var alliance = '',
        allianceId = 0,
        count = 0,
        len = Object.keys(alliances).length,

        done = function() {
            count++;
            if (count >= len) {
                console.log('Updated Alliances!');
                updateEmitter.emit('updatedAlliances', true);
            }
        };

    model.World.findOne( { worldId: defaultWorld }, function(e, data) {
        if (!e) {
            for (alliance in alliances) {
                if (alliances.hasOwnProperty(alliance)) {

                    allianceId = parseInt(alliance.slice(1), 10);

                    model.Alliance.update({ id: allianceId }, {
                        worldId: data,
                        id: allianceId,
                        name: alliances[alliance],
                        might: power[alliance]
                    }, { upsert: true }, function(e) {
                        if (e) {
                            console.log(e);
                            return;
                        }

                        done();
                    });
                }
            }
        }
    });
};

module.exports.updatePlayers = function(players) {
    var player = '',
        playerId = 0,
        playerObj = {},
        count = 0,
        len = Object.keys(players).length,

        done = function() {
            count++;
            if (count >= len) {
                console.log('Updated Players!');
                updateEmitter.emit('updatedPlayers', true);
            }
        };

    model.World.findOne( { worldId: defaultWorld }, function(e, data) {
        if (!e) {
            for (player in players) {
                if (players.hasOwnProperty(player)) {

                    playerId = parseInt(player.slice(1), 10);
                    playerObj = players[player];

                    (function(playerId, playerObj, world) {
                        model.Alliance.findOne( { id: playerObj.a }, function(e, data) {
                            if (!e) {
                                model.Player.update({ id: playerId }, {
                                    worldId: [world],
                                    id: playerId,
                                    name: playerObj.n,
                                    might: playerObj.m,
                                    level: playerObj.t,
                                    alliance: data,
                                    s: playerObj.s,
                                    w: playerObj.w,
                                    i: playerObj.i
                                }, { upsert: true }, function(e) {
                                    if (e) {
                                        console.log(e);
                                        return;
                                    }

                                    done();
                                });
                            }
                        });
                    })(playerId, playerObj, data);
                }
            }
        }
    });
};

module.exports.updateTiles = function(data) {
    var
        tiles = data.data,
        t = '',
        tile = {},
        alliance = {};

    model.World.findOne( { worldId: defaultWorld }, function(e, world) {
        if (!e) {
            for (t in tiles) {
                if (tiles.hasOwnProperty(t)) {
                    tile = tiles[t];

                    if (data.allianceNames['a' + tile.tileAllianceId]) {
                        alliance = {
                            id: tile.tileAllianceId,
                            name: data.allianceNames['a' + tile.tileAllianceId],
                            might: data.allianceMights['a' + tile.tileAllianceId]
                        };
                    }

                    model.Tiles.update(
                        { id: tile.tileId },
                        {
                            worldId: world,
                            id: tile.tileId,
                            x: tile.xCoord,
                            y: tile.yCoord,
                            tileType: tile.tileType,
                            originalLevel: tile.orgTileLevel,
                            level: tile.tileLevel,
                            cityId: tile.tileCityId,
                            cityName: tile.cityName || '',
                            userId: data.userInfo['u' + tile.tileUserId] || {},
                            allianceId: alliance,
                            provinceId: tile.tileProvinceId,
                            blockId: tile.tileBlockId
                        },
                        { upsert: true},
                        function(e) {
                            if (e) {
                                console.log(e);
                            }
                        }
                    );
                }
            }
        }
    });
};