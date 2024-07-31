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
  
  const ticketSchema1 = require("../../Schemas/ticketSchema1");
  
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
  
    execute: async (client, interaction) => {
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
          _id: new Types.ObjectId(),
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
                    name: "Channel",
                    value: `<#${channel.id}>`,
                    inline: true,
                  },
                  {
                    name: "Support Role",
                    value: `<@&${supportRole.id}>`,
                    inline: true,
                  },
                  {
                    name: "Panel Description",
                    value: ` ${description || `\`No Description\``}`,
                    inline: true,
                  },
                  {
                    name: "Ticket Logs",
                    value: `${ticketLogs}`,
                  }
                )
                .setColor('#A020F0')
                .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp(new Date())
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
  
        client.channels.cache
          .get(channel.id)
          .send({
            embeds: [
              new EmbedBuilder()
                .setTitle("Ticket System")
                .setDescription(description == null ? sampleMessage : description)
                .setColor('#A020F0')
                .setImage(
                  "https://raw.githubusercontent.com/flameface/discord-ticket-bot/main/assets/ticket.png"
                )
                .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp(new Date())
                          ],
                          components: [
                            new ActionRowBuilder().setComponents(
                              new ButtonBuilder()
                                .setCustomId("createTicket")
                                .setLabel("Create")
                                // .setEmoji("<:ticketbadge:1010601796374364171>")
                                .setStyle('Primary')
                            ),
                          ],
                        })
                        .then((msg) => {
                          const collector = msg.createMessageComponentCollector({
                            componentType: "BUTTON",
                            time: 60 * 1000, // 1 minute
                          });
                
                          collector.on("collect", async (buttonInteraction) => {
                            if (buttonInteraction.customId === "createTicket") {
                              const userId = buttonInteraction.user.id;
                
                              const data = await ticketSchema1.findOne({
                                guildId: interaction.guild.id,
                              });
                
                              if (!data)
                                return await buttonInteraction.reply({
                                  content: "You have not setup the ticket system yet.",
                                  ephemeral: true,
                                });
                
                              const channelPermissions = [
                                "ViewChannel",
                                "SendMessages",
                                "AddReactions",
                                "ReadMessageHistory",
                                "AttachFiles",
                                "EmbedLinks",
                                "UseApplicationCommands",
                              ];
                
                              const ticketEmbed = new EmbedBuilder().setColor("Blurple");
                
                              interaction.guild.channels
                                .create({
                                  name: `${buttonInteraction.user.username}-ticket`,
                                  type: ChannelType.GuildText,
                                  parent: data.categoryId,
                                  permissionOverwrites: [
                                    {
                                      id: userId,
                                      allow: [channelPermissions],
                                    },
                                    {
                                      id: data.supportId,
                                      allow: [channelPermissions],
                                    },
                                    {
                                      id: interaction.guild.roles.everyone.id,
                                      deny: ["ViewChannel"],
                                    },
                                  ],
                                })
                                .then(async (channel) => {
                                  await channel.send({
                                    embeds: [
                                      ticketEmbed
                                        .setTitle(`Ticket for ${buttonInteraction.user.username}`)
                                        .setDescription(
                                          "Support will be with you shortly. Please describe your issue below."
                                        )
                                        .setFooter({ text: `Requested by ${buttonInteraction.user.tag}`, iconURL: buttonInteraction.user.displayAvatarURL() })
                                        .setTimestamp(new Date())
                                    ],
                                  });
                
                                  await buttonInteraction.reply({
                                    content: `Your ticket has been created: ${channel}`,
                                    ephemeral: true,
                                  });
                                })
                                .catch(async (err) => {
                                  console.log(err);
                                });
                            }
                          });
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
                              )
                              .setColor('#A020F0')
                              .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
                              .setTimestamp(new Date())
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
                            .setDescription("Successfully deleted the ticket system!")
                            .setColor('#A020F0')
                            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
                            .setTimestamp(new Date())
                        ],
                        ephemeral: true,
                      });
                    }
                  },
                };
