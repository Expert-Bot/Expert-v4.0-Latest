const {model, Schema} = require('mongoose');
 
let reaction = new Schema({
    Guild: String,
    Message: String,
    Emoji: String,
    Role: String
});
 
module.exports = model("rrs", reaction);
