const { model, Schema } = require("mongoose");

const welcomeSchema = new Schema({
    guildId: {
        type: String, 
        required: true, 
    },
    welcomeChannel: String, 
    welcomeEmbed: Object, 
});

module.exports = model("welcomeSystem", welcomeSchema);