const mongoose = require('mongoose');

// Define the Log Schema
const logSchema = new mongoose.Schema({
  Guild: {
    type: String,
    required: true,
  },
  Channel: {
    type: String,
    required: true,
  },
});

// Create a Log model based on the schema
const Log = mongoose.model('Log', logSchema);

module.exports = Log;
