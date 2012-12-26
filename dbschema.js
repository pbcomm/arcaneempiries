/**
 * Created with JetBrains WebStorm.
 * User: Paul.Bronshteyn
 * Date: 12/19/12
 * Time: 6:05 PM
 * To change this template use File | Settings | File Templates.
 */
exports.schema = {

    worldSchema: {
        worldId: { type: Number, index: true },
        worldName: String,
        language: { type: String, default: 'en' }
    },

    requestSchema: {
        worldId: { type: Schema.Types.ObjectId, ref: 'World' },
        data: String,
        lastUpdate: { type: Date, default: Date.now }
    },

    userSchema: {
        worldId: [{ type: Schema.Types.ObjectId, ref: 'World' }],
        id: Number,
        name: String,
        level: Number,
        allianceId: { type: Schema.Types.ObjectId, ref: 'Alliance' },
        might: Number,
        s: String,
        w: String,
        i: String
    },

    allianceSchema: {
        worldId: { type: Schema.Types.ObjectId, ref: 'World' },
        id: { type: Number, index: true },
        name: String,
        might: Number
    },

    tileTypeSchema: {
        id: { type: Number, index: true },
        name: String
    },

    tilesSchecma: {
        worldId: { type: Schema.Types.ObjectId, ref: 'World' },
        id: Number,
        x: Number,
        y: Number,
        tileType: { type: Schema.Types.ObjectId, ref: 'TileType' },
        originalLevel: Number,
        level: Number,
        cityId: Number,
        cityName: String,
        userId: { type: Schema.Types.ObjectId, ref: 'Player' },
        allianceId: { type: Schema.Types.ObjectId, ref: 'Alliance' },
        provinceId: Number,
        blockId: Number
    }
};