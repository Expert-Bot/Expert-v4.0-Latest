const { Schema, model } = require('mongoose');

const schema = new Schema({
    userId: String, //identifier
    mediaId: String, //will show on profile || identifier

    followers: { type: Array, default: [] }, //will show on profile
    following: { type: Array, default: [] }, //will show on profile

    postCount: { type: Number, default: 0 },

    totalLikes: { type: Number, default: 0 }, // will show on profile

    likes: { type: Array, default: [] }, // used for like buttons on posts, etc
    favorites: { type: Array, default: [] }, // will show in a favorite posts section, like tiktok

    accountInfo: {
        privateAcc: { type: Boolean, default: false }, //doesnt let normal users see their account
        privatePosts: { type: Boolean, default: false }, //doesnt let normal users see their posts
        staff:  {
            role: { type: String, default: "None"} // Helper, Moderator, Manager, Developer
        } // will bypass private accounts, etc.
    }
})

module.exports = model('x_userprofile', schema)