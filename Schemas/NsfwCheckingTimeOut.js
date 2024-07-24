const mongoose = require("mongoose");

const AvatarCheckingTimeOut = new mongoose.Schema({
  Guild: String,
  Time: String,
});

module.exports = mongoose.model("AvatarCheckingTimeOut", AvatarCheckingTimeOut);
