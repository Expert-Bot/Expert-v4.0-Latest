
const {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
    PermissionsBitField,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js');
const ms = require('ms');

// Define the Slash Command
const command = new SlashCommandBuilder()
    .setName('premiumlist')
    .setDescription('Generate premium user list')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator);

command.path = 'Premium/premiumlist.js';
command.category = 'Premium';
command.premium = true;
command.cooldown = ms('5m');

const itemsPerPage = 5; // Number of premium users per page
let currentPage = 0;

const generateEmbed = (page, data, itemsPerPage, client) => {
    const totalPages = Math.ceil(data.size / itemsPerPage);

    const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('All Premium Guilds')
        .setFooter({ text: `Page ${page + 1}/${totalPages}` });

    if (data.size === 0) {
        embed.setDescription('No Premium Guilds Found');
        return embed;
    }

    const premiumData = [...data.values()].filter((item) => item.isPremium === true);

    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    premiumData.slice(startIndex, endIndex).forEach((data) => {
        const guildId = data.ID;
        const isPremium = data.isPremium;
        const premiumInfo = data.premium;
        const guild = client.guilds.cache.get(guildId);

        const redeemedAt = new Date(premiumInfo.redeemedAt);
        const expiresAt = new Date(premiumInfo.expiresAt);
        const redeemedBy = premiumInfo.redeemedBy;

        embed.addFields({
            name: `Guilds Premium Information - ${guild.name}`,
            value:
                `**Guild ID:** ${guildId}\n` +
                `**Is Premium:** ${isPremium ? 'Yes' : 'No'}\n` +
                `**Premium Plan:** ${premiumInfo.plan}\n` +
                `**Redeemed By:** <@${redeemedBy}>\n` +
                `**Redeemed At:** ${redeemedAt.toLocaleString()}\n` +
                `**Expires At:** ${expiresAt.toLocaleString()}`,
            inline: false,
        });
    });

    return embed;
};

module.exports = {
    data: command,

    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true });

        // Assuming data is a Map
        const data = await client.guildSettings;

        const totalPages = Math.ceil(data.size / itemsPerPage);
        const row = new ActionRowBuilder();

        if (totalPages > 1) {
            row.addComponents(
                new ButtonBuilder().setCustomId('firstPage').setLabel('First').setStyle(ButtonStyle.PRIMARY),
                new ButtonBuilder().setCustomId('previousPage').setLabel('Previous').setStyle(ButtonStyle.PRIMARY),
                new ButtonBuilder().setCustomId('nextPage').setLabel('Next').setStyle(ButtonStyle.PRIMARY),
                new ButtonBuilder().setCustomId('lastPage').setLabel('Last').setStyle(ButtonStyle.PRIMARY),
            );

            row.components[0].setDisabled(true);
            row.components[1].setDisabled(true);

            const initialMessage = await interaction.editReply({
                embeds: [generateEmbed(currentPage, data, itemsPerPage, client)],
                components: [row],
                ephemeral: true,
            });

            const filter = (i) => ['firstPage', 'previousPage', 'nextPage', 'lastPage'].includes(i.customId);
            const collector = initialMessage.createMessageComponentCollector({ filter, time: ms('5m') });

            collector.on('collect', async (i) => {
                switch (i.customId) {
                    case 'firstPage':
                        currentPage = 0;
                        break;
                    case 'previousPage':
                        if (currentPage > 0) {
                            currentPage--;
                        }
                        break;
                    case 'nextPage':
                        if (currentPage < totalPages - 1) {
                            currentPage++;
                        }
                        break;
                    case 'lastPage':
                        currentPage = totalPages - 1;
                        break;
                }

                const components = [row];

                components[0].components[0].setDisabled(currentPage === 0);
                components[0].components[1].setDisabled(currentPage === 0);
                components[0].components[2].setDisabled(currentPage === totalPages - 1);
                components[0].components[3].setDisabled(currentPage === totalPages - 1);

                await i.update({
                    embeds: [generateEmbed(currentPage, data, itemsPerPage, client)],
                    components: components,
                });
            });

            collector.on('end', () => {
                initialMessage.edit({ components: [] });
            });
        } else {
            await interaction.editReply({
                embeds: [generateEmbed(currentPage, data, itemsPerPage, client)],
                ephemeral: true,
            });
        }
    },
};

