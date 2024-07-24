const { model, Schema } = require("mongoose");

let moderationSchema = new Schema({
  GuildID: String,
  // NEEDED FOR LEVEL 2 ---
  MultiGuilded: Boolean,
  MuteRoleID: String,
  // --- NEEDED FOR LEVEL 2
  LogChannelID: String
}, { strict: false });

module.exports = model("moderation", moderationSchema);