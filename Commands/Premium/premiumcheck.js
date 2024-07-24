
const { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const premiumGuildDB = require('../../Schemas/premiumGuildDB');
const ms = require('ms');

const command = new SlashCommandBuilder().setName('premiumcheck').setDescription('Check if guild has Premium');

// Add a custom 'variables' property to the command
command.path = 'Premium/premiumcheck.js';
command.category = 'Premium';
//command.developer = false;
command.premium = true;
command.cooldown = ms('5s');

module.exports = {
    data: command,

    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const guild = client.guilds.cache.get(interaction.guildId);

        // Defer the reply as the first step.
        await interaction.deferReply({ fetchReply: true, ephemeral: true });

        const user = await premiumGuildDB.findOne({ ID: guild.id });

        if (user && user.isPremium) {
            const embed = new EmbedBuilder()
                .setColor('Green')
                .setDescription(`✔️ | ${guild.name} is a Premium Guild.`)
                .setTimestamp();
            return interaction.editReply({ embeds: [embed], ephemeral: true });
        } else {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setDescription(`❌ | ${guild.name} is not a Premium Guild.`)
                .setTimestamp();
            return interaction.editReply({ embeds: [embed], ephemeral: true });
        }
    },
};
