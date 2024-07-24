const { Events, Guild } = require('discord.js');
const AntinukeSettings = require('../../Models/antinukeSchema');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const settings = await AntinukeSettings.findOne({ guildId: member.guild.id });

        if (settings && settings.plugins.includes('anti-ban')) {
            const bannedMembers = await member.guild.bans.fetch();
            const bannedIds = bannedMembers.map(ban => ban.user.id);

            if (bannedIds.includes(member.id)) {
                await member.ban({ reason: 'Anti-Nuke: Anti-Ban plugin triggered' });
                console.log(`Banned a previously banned user: ${member.user.tag} (${member.id})`);
            }
        }
    },
};