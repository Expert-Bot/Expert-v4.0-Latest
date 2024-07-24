
const { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const premiumCodeDB = require('../../Schemas/premiumCodeDB');
const premiumGuildDB = require('../../Schemas/premiumGuildDB');
const betterlog = require('betterlog.js');
const moment = require('moment');
const ms = require('ms');

const command = new SlashCommandBuilder()
    .setName('premiumredeem')
    .setDescription('Redeem your Premium Code')
    .addStringOption((option) => option.setName('code').setDescription('Insert your Premium Code').setRequired(true));

// Add a custom 'variables' property to the command
command.path = 'Premium/premiumredeem.js';
command.category = 'Premium';
//command.developer = false;
//command.premium = false;
command.cooldown = ms('5s');

module.exports = {
    data: command,

    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { options } = interaction;

        // Defer the reply as the first step.
        await interaction.deferReply({ fetchReply: true, ephemeral: true });

        const input = options.getString('code');
        let guild = await premiumGuildDB.findOne({ ID: interaction.guild.id });
        const code = await premiumCodeDB.findOne({ code: input.toUpperCase() });

        if (guild && guild?.isPremium) {
            const embed = new EmbedBuilder().setColor('Red').setDescription(`\`❌\` | You are already a premium user.`);
            return interaction.editReply({ embeds: [embed] });
        }

        if (code) {
            const plan = code.plan;
            const codeID = code.code;
            const planDurations = {
                hourly: ms('1 hour'),
                daily: ms('1 day'),
                weekly: ms('1 week'),
                monthly: ms('1 month'),
                yearly: ms('1 year'),
                lifetime: ms('25 year'), // 25 years for "lifetime"
            };

            const planDuration = planDurations[plan];
            const expiresAt = moment().add(planDuration, 'milliseconds').format('dddd, MMMM Do YYYY HH:mm:ss');

            if (guild) {
                guild.ID = interaction.guild.id;
                guild.isPremium = true;
                guild.premium.ID = codeID;
                guild.premium.redeemedAt = Date.now();
                guild.premium.redeemedBy = interaction.user;
                guild.premium.expiresAt = Date.now() + planDuration;
                guild.premium.plan = plan;
                guild.save().catch((err) => {
                    betterlog.error(err);
                });
            } else {
                guild = await new premiumGuildDB({
                    ID: interaction.guild.id,
                    isPremium: true,
                    ['premium.ID']: codeID,
                    ['premium.redeemedAt']: Date.now(),
                    ['premium.redeemedBy']: interaction.user,
                    ['premium.expiresAt']: Date.now() + planDuration,
                    ['premium.plan']: plan,
                })
                    .save()
                    .catch((err) => {
                        betterlog.error(err);
                    });
            }
            await client.guildSettings.set(interaction.guild.id, guild);

            await code.deleteOne().catch(() => {});

            const embed = new EmbedBuilder()
                .setAuthor({ name: `Premium Redeemed!`, iconURL: interaction.client.user.displayAvatarURL() })
                .setDescription(
                    `Congratulations ${interaction.user}. You've successfully redeemed a premium code with the following details.`,
                )
                .setThumbnail(interaction.user.displayAvatarURL())
                .setColor('Green')
                .setTimestamp()
                .addFields([
                    { name: `\`👥\` • Redeemed By`, value: `\`\`\`${interaction.user.username}\`\`\``, inline: true },
                    { name: `\`💠\` • Plan Type`, value: `\`\`\`${plan}\`\`\``, inline: true },
                    { name: `\`🕓\` • Expired Time`, value: `\`\`\`${expiresAt}\`\`\``, inline: false },
                ]);

            await interaction.editReply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setDescription(`\`❌\` | The provided code was invalid, please use a valid one.`);

            await interaction.editReply({ embeds: [embed], ephemeral: true });
        }
    },
};

