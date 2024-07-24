const { Schema, model } = require('mongoose');

const AntinukeSettingsSchema = new Schema({
    guildId: { type: String, unique: true, required: true },
    enabled: { type: Boolean, default: false },
    whitelist: [{ type: String }],
    plugins: [{ type: String }],
    logsSystem: {
        enabled: { type: Boolean, default: false },
        channelId: { type: String },
    },
}, { timestamps: true });

module.exports = model('AntinukeSettingsSchema', AntinukeSettingsSchema);