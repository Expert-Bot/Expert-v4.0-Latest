const { Events, Role } = require('discord.js');
const AntinukeSettings = require('../../Models/antinukeSchema');
module.exports = {
    name: Events.RoleUpdate,
    async execute(oldRole, newRole) {
        const settings = await AntinukeSettings.findOne({ guildId: newRole.guild.id });

        if (settings && settings.plugins.includes('anti-role-update')) {
            newRole.setPermissions(oldRole.permissions);
            console.log(`Reversed a role permission update: ${newRole.name} (${newRole.id})`);
        }
    },
};