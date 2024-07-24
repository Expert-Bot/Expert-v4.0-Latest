const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('seek')
    .setDescription('Seek to a specific position in the current song.')
    .addIntegerOption(option =>
      option.setName('position')
        .setDescription('The position (in seconds) to seek to.')
        .setRequired(true)),
  async execute(interaction) {
    const queue = interaction.client.distube.getQueue(interaction.guildId);
    
    if (!queue) {
      return interaction.reply({ content: 'There is nothing in the queue right now!', ephemeral: true });
    }

    const time = interaction.options.getInteger('position');

    if (isNaN(time)) {
      return interaction.reply({ content: 'Please enter a valid number for the position!', ephemeral: true });
    }

    queue.seek(time);
    interaction.reply(`Seeked to ${time} seconds!`);
  },
};
