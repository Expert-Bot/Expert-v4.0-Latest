// anti-bots-add.js
const { Events, GuildMember } = require('discord.js');
const AntinukeSettings = require('../../Models/antinukeSchema');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const settings = await AntinukeSettings.findOne({ guildId: member.guild.id });

        if (settings && settings.plugins.includes('anti-bots-add')) {
            if (member.user.bot) {
                await member.ban({
                    reason: 'Anti-Nuke: Anti-Bots-Add plugin triggered',
                });
                console.log(`Banned a newly added bot: ${member.user.tag} (${member.id})`);
            }
        }
    },
};