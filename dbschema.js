/**
 * Created with JetBrains WebStorm.
 * User: Paul.Bronshteyn
 * Date: 12/19/12
 * Time: 6:05 PM
 * To change this template use File | Settings | File Templates.
 */
exports.schema = {

    worldSchema: {
        world: String
    },

    requestSchema: {
        data: String,
        lastUpdate: { type: Date, default: Date.now },
        world: { type: Schema.Types.ObjectId, ref: 'World' }
    },

    userSchema: {
        id: Number,
        name: String,
        level: Number,
        alliance: { type: Schema.Types.ObjectId, ref: 'Alliance' },
        might: Number
    },

    allianceSchema: {
        id: Number,
        name: String,
        might: Number
    },

    tileTypeSchema: {
        id: Number,
        name: String
    },

    tilesSchecma: {
        id: Number,
        x: Number,
        y: Number,
        type: { type: Schema.Types.ObjectId, ref: 'TileType' },
        originalLevel: Number,
        level: Number,
        cityId: Number,
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        allianceId: { type: Schema.Types.ObjectId, ref: 'Alliance' },
        provinceId: Number,
        blockId: Number
    }
};