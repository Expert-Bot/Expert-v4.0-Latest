const { Schema, model } = require("mongoose");

const gptchema = new Schema({
  Guild: String,
  Channel: String,
});

module.exports = model("gpt", gptchema);