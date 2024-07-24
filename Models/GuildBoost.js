const mongoose = require("mongoose");

const guildBoostSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  boostChannelId: {
    type: String,
    required: true,
  },
  boostLogChannelId: {
    type: String,
    required: true,
  },
  roleId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("GuildBoost", guildBoostSchema);
