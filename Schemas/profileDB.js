const { model, Schema } = require('mongoose');

module.exports = model(
    'profileDB',
    new Schema(
        {
            userID: {
                type: String,
                required: true,
            },
            profile: {
                gender: {
                    type: String,
                    default: null,
                },
                age: {
                    type: Number,
                    default: null,
                },
                birthday: {
                    type: String,
                    default: null,
                },
                languages: {
                    type: String,
                    default: null,
                },
                badges: {
                    type: String,
                    default: null,
                },
                favorite: {
                    color: {
                        type: String,
                        default: null,
                    },
                    animals: {
                        type: String,
                        default: null,
                    },
                    foods: {
                        type: String,
                        default: null,
                    },
                    songs: {
                        type: String,
                        default: null,
                    },
                    artists: {
                        type: String,
                        default: null,
                    },
                    movies: {
                        type: String,
                        default: null,
                    },
                    actors: {
                        type: String,
                        default: null,
                    },
                },
                origin: {
                    type: String,
                    default: null,
                },
                status: {
                    type: String,
                    default: null,
                },
                hobbies: {
                    type: String,
                    default: null,
                },
                aboutme: {
                    type: String,
                    default: null,
                },
            },
            lastUpdated: {
                type: Date,
                default: new Date(),
            },
        },
        {
            versionKey: false, // You should be aware of the outcome after set to false
        },
    ),
);
