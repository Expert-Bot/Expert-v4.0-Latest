const { Schema, model } = require('mongoose');

const antinukeSchema = new Schema({
    guildId: { type: String, unique: true, required: true },
    plugins: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});

module.exports = model('AntinukeSettings', antinukeSchema);