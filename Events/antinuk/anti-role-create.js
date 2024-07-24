const { Events, Role } = require('discord.js');
const AntinukeSettings = require('../../Models/antinukeSchema');
module.exports = {
    name: Events.RoleCreate,
    async execute(role) {
        const settings = await AntinukeSettings.findOne({ guildId: role.guild.id });

        if (settings && settings.plugins.includes('anti-role-create')) {
            await role.delete('Anti-Nuke: Anti-Role-Create plugin triggered');
            console.log(`Deleted a newly created role: ${role.name} (${role.id})`);
        }
    },
};
