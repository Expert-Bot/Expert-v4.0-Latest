const { Events, Channel, PermissionsBitField } = require('discord.js');
const AntinukeSettings = require('../../Models/antinukeSchema');

module.exports = {
    name: Events.ChannelUpdate,
    async execute(oldChannel, newChannel) {
        const settings = await AntinukeSettings.findOne({ guildId: newChannel.guild.id });

        if (settings && settings.plugins.includes('anti-channel-permission-update')) {
            const originalPermissions = oldChannel.permissionOverwrites.cache;
            const updatedPermissions = newChannel.permissionOverwrites.cache;

            originalPermissions.forEach(async (permission, id) => {
                if (!updatedPermissions.has(id)) {
                    await newChannel.permissionOverwrites.create(id, {
                        ViewChannel: permission.ViewChannel,
                        SendMessages: permission.SendMessages,
                        Connect: permission.Connect,
                        ...permission.toJSON(),
                    });
                    console.log(`Reversed a channel permission update for ${id} in ${newChannel.name} (${newChannel.id})`);
                } else if (permission.denied.length > updatedPermissions.get(id).denied.length || permission.allowed.length > updatedPermissions.get(id).allowed.length) {
                    await newChannel.permissionOverwrites.edit(id, {
                        ViewChannel: PermissionsBitField.Flags.ViewChannel,
                        SendMessages: PermissionsBitField.Flags.SendMessages,
                        Connect: PermissionsBitField.Flags.Connect,
                        ...permission.toJSON(),
                    });
                    console.log(`Reversed a channel permission update for ${id} in ${newChannel.name} (${newChannel.id})`);
                }
            });
        }
    },
};