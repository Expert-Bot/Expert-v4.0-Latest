const mongoose = require("mongoose");

const Whitelist = new mongoose.Schema({
  Guild: String,
  User: Array,
  Role: Array,
});

module.exports = mongoose.model('Whitelist', Whitelist); 