const { Events, GuildMember } = require('discord.js');
const AntinukeSettings = require('../../Models/antinukeSchema');

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        const settings = await AntinukeSettings.findOne({ guildId: member.guild.id });

        if (settings && settings.plugins.includes('anti-kick-member')) {
            if (member.manageable) {
                await member.guild.members.fetch();
                const originalMember = await member.guild.members.fetch(member.id);
                await originalMember.createDM();
                await originalMember.ban({
                    reason: 'Anti-Nuke: Anti-Kick-Member plugin triggered',
                });
                await originalMember.unban();
                console.log(`Undid a kicked member: ${originalMember.user.tag} (${originalMember.id})`);
            }
        }
    },
};
