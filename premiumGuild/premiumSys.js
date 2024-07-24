const cron = require('node-cron');

const premiumCodeDB = require('../Schemas/premiumCodeDB');
const premiumGuildDB = require('../Schemas/premiumGuildDB');

module.exports = async (client) => {
    cron.schedule('*/60 * * * * *', async () => {
        await premiumGuildDB.find({ isPremium: true }, async (err, guilds) => {
            if (guilds && guilds.length) {
                // Set the expire Date and Time for our Guild + Code
                for (let guild of guilds) {
                    if (Date.now() >= guild.premium.expiresAt) {
                        guild.isPremium = false;
                        guild.premium.redeemedBy = [];
                        guild.premium.redeemedAt = null;
                        guild.premium.expiresAt = null;
                        guild.premium.plan = null;

                        // Save the updated Guild within the guildsSettings.
                        const newGuild = await guild.save({ new: true }).catch(() => {});
                        client.guildsSettings.set(newGuild.ID, newGuild);
                    }
                }
            }
        });

        const expiredCodes = await premiumCodeDB.find({ expiresAt: { $lte: new Date() } });

        if (expiredCodes && expiredCodes.length > 0) {
            // Iterate through the expired premium codes and remove them from the database
            expiredCodes.forEach(async (code) => {
                await premiumCodeDB.findOneAndDelete({ _id: code._id });
            });
        }
    });
};
