const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const aiSchema = require("../../Models/chatbot");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chatbot")
    .setDescription("Add a chat-bot to the desired channel!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((sub) =>
      sub
        .setName("enable")
        .setDescription("Enable the chat bot.")
        .addChannelOption((o) =>
          o
            .setName("channel")
            .setDescription("The channel where bot will work.")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub.setName("disable").setDescription("Disable the chat-bot")
    ),
  async execute(interaction, client) {
    const { guild } = interaction;
    if (interaction.options.getSubcommand() === "enable") {
      const data = await aiSchema.findOne({
        Guild: guild.id,
      });
      if (data) {
        const channel = interaction.options.getChannel("channel");
        await aiSchema.findOneAndUpdate({
          Guild: channel.guild.id,
          Channel: channel.id,
        });
        await data.save();
        const em = new EmbedBuilder()
          .setColor("Blue")
          .setTitle(`> Chat-Bot Updated`)
          .setDescription(`**Channel:** <#${channel.id}>`)
          .setTimestamp();
        await interaction.reply({
          embeds: [em],
        });
      } else if (!data) {
        const channel = interaction.options.getChannel("channel");
        const a = await aiSchema.create({
          Guild: channel.guild.id,
          Channel: channel.id,
        });
        await a.save();
        const em = new EmbedBuilder()
          .setColor("Blue")
          .setTitle(`> Chat-Bot Created!`)
          .setDescription(`**Channel:** <#${channel.id}>`)
          .setTimestamp();
        await interaction.reply({
          embeds: [em],
        });
      }
    } else if (interaction.options.getSubcommand() === "disable") {
      const data = await aiSchema.findOne({
        Guild: guild.id,
      });
      if (!data) {
        return interaction.reply({
          content: `Chat bot isn't setup in this server.`,
          ephemeral: true,
        });
      }
      await aiSchema.findOneAndDelete({
        Guild: guild.id,
      });
      await interaction.reply({
        content: `Successfully removed the chat bot in **${interaction.guild.name}** ${client.success}`,
        ephemeral: true,
      });
    }
  },
};