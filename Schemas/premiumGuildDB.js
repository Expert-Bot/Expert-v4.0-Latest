
const { model, Schema } = require('mongoose');

module.exports = model(
    'premiumGuildDB',
    new Schema(
        {
            ID: {
                type: String,
                required: true,
                unique: true,
            },
            isPremium: {
                type: Boolean,
                default: false,
            },
            premium: {
                redeemedBy: {
                    type: Array,
                    default: null,
                },
                redeemedAt: {
                    type: Number,
                    default: null,
                },
                expiresAt: {
                    type: Number,
                    default: null,
                },
                plan: {
                    type: String,
                    default: null,
                },
            },
        },
        {
            versionKey: false, // You should be aware of the outcome after set to false
        },
    ),
);
