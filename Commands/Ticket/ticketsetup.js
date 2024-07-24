const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { Types } = require("mongoose");

const ticketSchema1 = require("../../Schemas/tickets/ticketSchema1");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tickets")
    .setDescription("Ticket options and setup")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("setup")
        .setDescription("Setup the ticket system")
        .addChannelOption((option) => {
          return option
            .setName("channel")
            .setDescription("channel to send the ticket message in")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText);
        })
        .addChannelOption((option) => {
          return option
            .setName("category")
            .setDescription("Category to create the ticket in")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildCategory);
        })
        .addRoleOption((option) => {
          return option
            .setName("support-role")
            .setDescription("Support role for the ticket")
            .setRequired(true);
        })
        .addChannelOption((option) => {
          return option
            .setName("ticket-logs")
            .setDescription("The channel where ticket logs get sent in.")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText);
        })
        .addStringOption((option) => {
          return option
            .setName("description")
            .setDescription("The text to send with the ticket panel")
            .setRequired(false);
        })
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("delete").setDescription("Delete the ticket system")
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "setup") {
      const channel = interaction.options.getChannel("channel");
      const category = interaction.options.getChannel("category");
      const supportRole = interaction.options.getRole("support-role");
      const description = interaction.options.getString("description");
      const ticketLogs = interaction.options.getChannel("ticket-logs");

      const data = await ticketSchema1.findOne({
        guildId: interaction.guild.id,
      });

      if (data) {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("You have already created the ticket system")
              .addFields({
                name: "<:channelemoji:1015242699277873192> Channel",
                value: `<:reply:1015235235195146301> <#${data.channelId}>`,
                inline: true,
              }),
          ],
          ephemeral: true,
        });
        return;
      }

      const newSchema = new ticketSchema1({
        _id: Types.ObjectId(),
        guildId: interaction.guild.id,
        channelId: channel.id,
        supportId: supportRole.id,
        categoryId: category.id,
        logsId: ticketLogs.id,
      });

      newSchema.save().catch((err) => console.log(err));

      interaction
        .reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Ticket System")
              .setDescription("Successfully setup ticket system!")
              .addFields(
                {
                  name: "<:channelemoji:1015242699277873192> Channel",
                  value: `<:reply:1015235235195146301>  <#${channel.id}>`,
                  inline: true,
                },
                {
                  name: "<:9445blurplestaff:961074559111528480> Support Role",
                  value: `<:reply:1015235235195146301>  <@&${supportRole.id}>`,
                  inline: true,
                },
                {
                  name: "<:Discussions:1015242700993351711> Panel Description",
                  value: `<:reply:1015235235195146301>  ${description}`,
                  inline: true,
                },
                {
                  name: "Ticket Logs",
                  value: `<#${ticketLogs}>`,
                }
              ),
          ],
          ephemeral: true,
        })
        .catch(async (err) => {
          console.log(err);
          await interaction.reply({
            content: "An error has occurred...",
          });
        });

      const sampleMessage =
        'Welcome to tickets! Click the "Create Ticket" button to create a ticket and the support team will be right with you!';

      client.channels.cache.get(channel.id).send({
        embeds: [
          new EmbedBuilder()
            .setTitle("Ticket System")
            .setDescription(description == null ? sampleMessage : description)
            .setColor(0xe51227)
            .setImage(
              "https://raw.githubusercontent.com/flameface/discord-ticket-bot/main/assets/ticket.png"
            ),
        ],
        components: [
          new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setCustomId("createTicket")
              .setLabel("Create")
             // .setEmoji("<:ticketbadge:1010601796374364171>")
              .setStyle(ButtonStyle.Danger)
          ),
        ],
      });
    }
    if (interaction.options.getSubcommand() === "delete") {
      const ticketData = await ticketSchema1.findOne({
        guildId: interaction.guild.id,
      });

      if (!ticketData) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Ticket System")
              .setDescription("You already have a ticket system setup!")
              .addFields(
                {
                  name: "<:SlashCmd:1016055567724326912> Usage",
                  value: "<:reply:1015235235195146301>  /tickets setup",
                  inline: true,
                },
                {
                  name: "<:channelemoji:1015242699277873192> Existing channel",
                  value: `<:reply:1015235235195146301>  <#${ticketData.channelId}>`,
                }
              ),
          ],
          ephemeral: true,
        });
      }

      ticketSchema1
        .findOneAndDelete({
          guildId: interaction.guild.id,
        })
        .catch((err) => console.log(err));

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Ticket System")
            .setDescription("Successfully deleted the ticket system!"),
        ],
        ephemeral: true,
      });
    }
  },
};