const { StringSelectMenuBuilder, SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, ActionRowBuilder } = require('discord.js');
const Level = require('../../Schemas/level');
const canvafy = require('canvafy'); // Import Canvafy package
const { loadImage } = require('@napi-rs/canvas');

// Create a set to keep track of loaded avatars
const loadedAvatars = new Set();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('XP Leaderboard'),

  async execute(interaction, client) {
    await interaction.deferReply();

    const levelData = await Level.find({ Guild: interaction.guild.id });

    if (levelData.length) {
      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('leaderboardOptions')
        .setPlaceholder('Select an option')
        .addOptions([
          { label: 'XP - All Time', value: 'xp-all', emoji: '📊' },
          { label: 'XP - Daily', value: 'xp-daily', emoji: '📆' },
          { label: 'XP - Weekly', value: 'xp-weekly', emoji: '📅' },
          { label: 'Level - All Time', value: 'level-all', emoji: '🔢' },
          { label: 'Level - Daily', value: 'level-daily', emoji: '🔆' },
          { label: 'Level - Weekly', value: 'level-weekly', emoji: '🗓️' },
        ]);

      const row = new ActionRowBuilder().addComponents(selectMenu);

      let sortBy = 'XP';
      let timeframe = 'all';

      const usersData = levelData.map((user, index) => ({
        top: index + 1,
        avatar: user.UserAvatar, // Replace with the actual property name in your Level schema for user avatar
        tag: getUserDisplayName(user.User, interaction.guild),
        score: user[sortBy],
      }));

      // Sort usersData based on score in descending order
      usersData.sort((a, b) => b.score - a.score);

      // Take only the top 10 users
      const top10Users = usersData.slice(0, 10);

      // Set the correct 'top' property for each user
      top10Users.forEach((user, index) => {
        user.top = index + 1;
      });

      const top = await new canvafy.Top()
        .setOpacity(0.6)
        .setScoreMessage("XP:")
        .setabbreviateNumber(false)
        .setBackground("image", "https://images.pexels.com/photos/11155505/pexels-photo-11155505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
        .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
        .setUsersData(top10Users)
        .build();

      // Clear the set before processing avatars
      loadedAvatars.clear();

      for (const user of top10Users) {
        // Check if the avatar has been loaded before
        if (!loadedAvatars.has(user.avatar)) {
          try {
            const avatar = await loadImage(user.avatar);
            ctx.clip();
            ctx.drawImage(avatar, 0, Avatar_Y, 70, 70);
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 8;
            ctx.shadowOffsetY = 6;
            ctx.shadowColor = "#0a0a0a";
            // Add the loaded avatar to the set
            loadedAvatars.add(user.avatar);
          } catch (error) {
            console.error('Error loading image:', error);
            // Handle the error gracefully, you might want to draw a default avatar or skip this user
          }
        }
        // Continue with other drawing logic
      }

      await interaction.followUp({
        files: [{
          attachment: top,
          name: `top-${interaction.user.id}.png`
        }],
        components: [row],
      });
    } else {
      const noRankingEmbed = new EmbedBuilder()
        .setTitle('📊 Leaderboard')
        .setColor(0x6666ff)
        .setDescription('There is currently no leaderboard available.')
        .setFooter({
          text: `Requested by: ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        });

      interaction.followUp({ embeds: [noRankingEmbed] });
    }
  },
};

function getUserDisplayName(userId, guild) {
  const member = guild.members.cache.get(userId);
  return member ? member.user.username : 'Unknown User';
}
