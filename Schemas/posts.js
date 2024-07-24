const { Schema, model } = require('mongoose');

const schema = new Schema({
    postIdentifier: String, //the identification of the post (a random string of numbers, like discord ids)
    ownerId: String, //the id of the user who made the post
    text: { type: String, required: true }, //Will be the description of the post basically

    postedAt: Number,
    
    likes: Number,
    favorites: Number,
})

module.exports = model('x_userpost', schema)