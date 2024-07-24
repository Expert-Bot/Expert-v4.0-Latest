const { Events, Role } = require('discord.js');
const AntinukeSettings = require('../../Models/antinukeSchema');

module.exports = {
    name: Events.RoleDelete,
    async execute(role) {
        const settings = await AntinukeSettings.findOne({ guildId: role.guild.id });

        if (settings && settings.plugins.includes('anti-role-delete')) {
            const newRole = await role.guild.roles.create({
                data: {
                    name: role.name,
                    color: role.color,
                    permissions: role.permissions,
                    hoist: role.hoist,
                    mentionable: role.mentionable,
                },
            });
            console.log(`Restored a deleted role: ${newRole.name} (${newRole.id})`);
        }
    },
};