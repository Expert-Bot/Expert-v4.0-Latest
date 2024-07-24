const { model, Schema } = require('mongoose');

const BotSchema = new Schema({
    Total: {
        type: Number,
        default: null,
    },
    Streak: {
        type: Number,
        default: null,
    },
    Date: {
        type: Date,
        default: new Date(),
    },
});

const ChannelSchema = new Schema({
    Total: {
        type: Number,
        default: null,
    },
    Streak: {
        type: Number,
        default: null,
    },
    Date: {
        type: Date,
        default: new Date(),
    },
});

module.exports = model(
    'voteDB',
    new Schema(
        {
            User: {
                type: String,
                required: true,
            },
            Bot: BotSchema,
            Channel: ChannelSchema,
        },
        {
            versionKey: false, // You should be aware of the outcome after set to false
        },
    ),
);