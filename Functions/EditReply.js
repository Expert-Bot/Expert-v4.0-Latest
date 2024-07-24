const { ChatInputCommandInteraction, EmbedBuilder } = require(discord.js)

/**
 *
 * @param {ChatInputCommandInteraction} interaction
 * @param {String} emoji
 * @param {String} description
 * @param {Boolean} ephemeral
 */
async function editReply(interaction, emoji, description, ephemeral) {
  //Replying
  await interaction.editReply({
    embeds: [
      new EmbedBuilder()
        .setDescription(`${emoji} | ${description}`)
        .setColor("Random")
        .setTimestamp(),
    ],
    ephemeral: ephemeral,
  });
}

export default editReply;
