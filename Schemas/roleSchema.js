const { model, Schema } = require('mongoose');
 
let roleSchema = new Schema({
    Guild: String,
    ChannelID: String,
    MessageID: String,
    Title: String,
    Description: String,
    Image: String,
    Thumbnail: String,
  
    Button1: String,
    RoleID1: String,
    Emoji1: String,

    Button2: String,
    RoleID2: String,
    Emoji2: String,

    Button2: String,
    RoleID2: String,
    Emoji2: String,

    Button3: String,
    RoleID3: String,
    Emoji3: String,

    Button4: String,
    RoleID4: String,
    Emoji4: String,

    Button5: String,
    RoleID5: String,
    Emoji5: String,

    Button6: String,
    RoleID6: String,
    Emoji6: String,

    Button7: String,
    RoleID7: String,
    Emoji7: String,

    Button8: String,
    RoleID8: String,
    Emoji8: String,

    Button9: String,
    RoleID9: String,
    Emoji9: String,

    Button10: String,
    RoleID10: String,
    Emoji10: String,
})
 
module.exports = model('roleSchema', roleSchema);