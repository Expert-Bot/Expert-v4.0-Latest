const { Events, Channel } = require('discord.js');
const AntinukeSettings = require('../../Models/antinukeSchema');

module.exports = {
    name: Events.ChannelDelete,
    async execute(channel) {
        const settings = await AntinukeSettings.findOne({ guildId: channel.guild.id });

        if (settings && settings.plugins.includes('anti-channel-delete')) {
            const newChannel = await channel.guild.channels.create({
                name: channel.name,
                type: channel.type,
                position: channel.position,
                topic: channel.topic,
                nsfw: channel.nsfw,
                rateLimitPerUser: channel.rateLimitPerUser,
                permissionOverwrites: channel.permissionOverwrites.cache,
            });
            console.log(`Restored a deleted channel: ${newChannel.name} (${newChannel.id})`);
        }
    },
};