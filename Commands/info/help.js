const {
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  embedMsg,
  guild,
  name,
} = require("discord.js");
module.exports = {
  premiumOnly: false,
  voteRequired: false,
  data: new SlashCommandBuilder()
    .setName("help")

    .setDescription("Get a list of all the commands from the discord bot."),
  async execute(interaction) {

    const { client } = interaction;

    const voteButton = new ButtonBuilder()
      .setLabel("Vote")
      .setStyle(ButtonStyle.Link)
      .setURL("https://top.gg/bot/1023810715250860105/vote"); // Replace "your-bot-id" with your actual bot ID

    const supportButton = new ButtonBuilder()
      .setLabel("Support")
      .setStyle(ButtonStyle.Link)
      .setURL("https://discord.gg/dj44zMsnNX"); // Replace "your-support-server" with your actual support server invite link

    const devbutton = new ButtonBuilder()
      .setLabel("Developer")
      .setStyle(ButtonStyle.Link)
      .setURL("https://discord.com/users/903237169722834954");

    const emojis = {
      ai: "<:ai:1198697568503353404>",
      backup: "<:icons_gitpullrequest:1106299481974124695",
      suggestions: "<:6523information:1169331638350647407>",
      antinuke: "<:anti:1198697572164964382>",
      halloween: "<:halloween:1198706033581895821>",
      reactionroles: "<:rr:1198706039504240711>",
      premium: "<:premium:1198697597477584926>",
      info: "<:info:1198706035838423241>",
      developer: "<:dev:1198697577953099868>",
      economy: "<:economy:1198706029832175717>",
      applications: "<:appplication:1198697574224384020>",
      botshop: "<:8916shoppingcart:1169306292989481040>",
      fun: "<:fun:1198697581795082270>",
      giveaways: "<:Giveaway:1198697586077483049>",
      moderation: "<:mod:1198697588178821251>",
      music: "<:music:1198697591760748564>",
      roles: "<:role:1198697601478967319>",
      services: "<:service:1198697605685858444>",
      suggestion: "<:suggestion:1198706780155424838>",
      ticket: "<:ticket:1198697609460711474>",
      setup: "<:setup:1198706043253956890>",
      stats: "<:discotoolsxyzicon1:1208708909473468466>"
    };


    function getCommand(name) {
      const getCommandID = client.application.commands.cache
        .filter((cmd) => cmd.name === name) // Filter by command name
        .map((cmd) => cmd.id); // Map to just the ID property

      return getCommandID;
    }

    const directories = [
      ...new Set(client.commands.map((cmd) => cmd.folder)),
    ];

    const formatString = (str) =>
      `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

    const categories = directories.map((dir) => {
      const getCommands = client.commands
        .filter((cmd) => cmd.folder === dir)
        .map((cmd) => {
          return {
            name: cmd.data.name,
            description:
              cmd.data.description ||
              " There is no description for this command.",
          };
        });
      return {
        directory: formatString(dir),
        commands: getCommands,
      };
    });
    const embed = new EmbedBuilder()
      .addFields({ name: ' <:premium:1198697597477584926> Premium? ', value: `> Want to buy Premium Join Our Discord Expert Support [server](https://discord.gg/hY2KBQHbeH)` })
      //.setDescription(`<:premium:1198697597477584926> Premium? /n > Want to buy Premium Join Our Discord Expert Support [server](https://discord.gg/hY2KBQHbeH)`)
      .addFields({ name: ' <:slash:1198707732602175599> Commands? ', value: `> Browse through Drop commands list and find new Functions!` })
      .addFields({ name: '  <:st:1198708158206586911> Setup?', value: ` > Follow command lines to setup in your discord server ` })
      .setColor("#0D3475")
      .setImage(`https://media.discordapp.net/attachments/1025806819337187422/1197621742424817844/Asset_9.png?ex=65bbef2a&is=65a97a2a&hm=8f850f3c706489c40f23686db45ac50bb49c15dd04b3a3d8ec7619588c7af358&=&format=webp&quality=lossless&width=1440&height=328`)
      .setAuthor({ name: `${client.user.username}'s Commands`, iconURL: client.user.avatarURL() })
    const components = (state) => [
      new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("help-menu")

          .setPlaceholder("Find a category")
          .setDisabled(state)
          .addOptions(
            categories.map((cmd) => {
              return {
                label: cmd.directory,
                value: cmd.directory.toLowerCase(),
                description: `Commands from ${cmd.directory} category.`,
                emoji: emojis[cmd.directory.toLowerCase() || null],
              };
            })
          )
      ),
      new ActionRowBuilder().addComponents(voteButton, supportButton, devbutton),
    ];
    const initialMessage = await interaction.reply({
      embeds: [embed],
      components: components(false),
    });

    const filter = (interaction) =>
      interaction.user.id === interaction.member.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: ComponentType.StringSelect,
    });

    collector.on("collect", (interaction) => {
      const [directory] = interaction.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );

      const categoryEmbed = new EmbedBuilder()
        .setTitle(`${emojis[directory.toLowerCase() || null]}  ${formatString(directory)} commands`)
        .setImage(`https://media.discordapp.net/attachments/1025806819337187422/1197621742424817844/Asset_9.png?ex=65bbef2a&is=65a97a2a&hm=8f850f3c706489c40f23686db45ac50bb49c15dd04b3a3d8ec7619588c7af358&=&format=webp&quality=lossless&width=1440&height=328`)
        .setDescription(
          `A list of all the commands categorized under ${directory}.`
        )
        .setColor("#0D3475")
        .addFields(
          category.commands.map((cmd) => {
            return {
              name: `</${cmd.name}:${getCommand(cmd.name)}>`,
              value: `\`${cmd.description}\``,
              inline: true,
            };
          })
        );

      interaction.update({ embeds: [categoryEmbed] });
    });

    collector.on("end", () => {
      initialMessage.edit({ components: components(true) });
    });
  },
};