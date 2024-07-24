const { Events, Guild } = require('discord.js');
const AntinukeSettings = require('../../Models/antinukeSchema');

module.exports = {
    name: Events.WebhookUpdate,
    async execute(webhook) {
        const settings = await AntinukeSettings.findOne({ guildId: webhook.guild.id });

        if (settings && settings.plugins.includes('anti-webhook-create')) {
            await webhook.delete('Anti-Nuke: Anti-Webhook-Create plugin triggered');
            console.log(`Deleted a newly created webhook in ${webhook.guild.name} (${webhook.guild.id})`);
        }
    },
};
