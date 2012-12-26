var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var
    World = new Schema({
        id: { type: Number, index: true },
        worldName: String,
        language: { type: String, default: 'en' }
    }),

    Requests = new Schema({
        worldId: { type: Schema.Types.ObjectId, ref: 'World' },
        data: String,
        lastUpdate: { type: Date, default: Date.now }
    }),

    TileType = new Schema({
        tileType: { type: Number, index: true },
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
        tileName: String,
        originalLevel: Number,
        level: Number,
        cityId: Number,
        cityName: String,
        user: {}, //{ type: Schema.Types.ObjectId, ref: 'Player' },
        alliance: {}, //{ type: Schema.Types.ObjectId, ref: 'Alliance' },
        provinceId: Number,
        provinceName: String,
        blockId: Number
    });

mongoose.model('World', World);
mongoose.model('Requests', Requests);
mongoose.model('Player', Player);
mongoose.model('Alliance', Alliance);
mongoose.model('TileType', TileType);
mongoose.model('Tiles', Tiles);