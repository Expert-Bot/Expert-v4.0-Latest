const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
});

const Guild = mongoose.model('Guild', guildSchema);

module.exports = { Guild };
