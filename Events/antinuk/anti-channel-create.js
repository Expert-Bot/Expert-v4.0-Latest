const { Events, Channel } = require('discord.js');
const AntinukeSettings = require('../../Models/antinukeSchema');

module.exports = {
    name: Events.ChannelCreate,
    async execute(channel) {
        const settings = await AntinukeSettings.findOne({ guildId: channel.guild.id });

        if (settings && settings.plugins.includes('anti-channel-create')) {
            await channel.delete('Anti-Nuke: Anti-Channel-Create plugin triggered');
            console.log(`Deleted a newly created channel: ${channel.name} (${channel.id})`);
        }
    },
};