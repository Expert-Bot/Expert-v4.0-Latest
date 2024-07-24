const { Schema, model } = require('mongoose');

const schema = new Schema({
    guildId: String,
    guildMediaId: String,

    channelId: { type: String, required: true },
    
    autopost: { type: Boolean, default: false },  
})

module.exports = model('x_guildprofile', schema)