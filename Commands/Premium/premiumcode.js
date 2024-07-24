
const {
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
    PermissionsBitField,
} = require('discord.js');
const voucher_codes = require('voucher-code-generator');
//const { green } = require('../../colors.json');
const premiumCodeDB = require('../../Schemas/premiumCodeDB');
const ms = require('ms');

const command = new SlashCommandBuilder()
    .setName('premiumcode')
    .setDescription('Generate Premium Server Codes')
    .addStringOption((option) =>
        option
            .setName('plan')
            .setDescription('Select your plan')
            .setRequired(true)
            .addChoices(
                { name: 'Hourly', value: 'hourly' },
                { name: 'Daily', value: 'daily' },
                { name: 'Weekly', value: 'weekly' },
                { name: 'Monthly', value: 'monthly' },
                { name: 'Yearly', value: 'yearly' },
                { name: 'Life Time', value: 'lifetime' },
            ),
    )
    .addNumberOption((option) =>
        option.setName('amount').setDescription('Amount of codes to generate.').setRequired(false),
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator);

// Add a custom 'variables' property to the command
command.path = 'Premium/premiumcode.js';
command.category = 'Premium';
command.cooldown = ms('5m');
command.developer = true;

module.exports = {
    data: command,

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const plan = interaction.options.getString('plan');
        let amount = interaction.options.getNumber('amount');
        if (!amount) amount = 1;
        let codes = [];

        for (var i = 0; i < amount; i++) {
            const codePremium = voucher_codes.generate({
                pattern: '####-####-####',
            });

            // Save the Code as a String ("ABCDEF ...") in the Database
            const code = codePremium.toString().toUpperCase();

            // Security check, check if the code exists in the database.
            const find = await premiumCodeDB.findOne({
                code: code,
            });

            // If it does not exist, create it in the database.
            if (!find) {
                premiumCodeDB.create({
                    code: code,
                    plan: plan,
                    expiresAt: Date.now() + ms('30d'),
                });

                // Push the new generated Code into the Queue
                codes.push(`${i + 1}- ${code}`);
            }
        }

        const embed = new EmbedBuilder()
            .setTitle(`・PREMIUM CODES`)
            .setDescription(
                `\`\`\`Generated +${codes.length} Premium Codes:\n\n--------\n${codes.join('\n')}\n--------\`\`\``,
            )
            .addFields({ name: `\`💠\` • Plan Type:`, value: `\`\`\`${plan}\`\`\``, inline: false })
            .addFields({ name: `How to redeem:`, value: `\`\`\`/premiumredeem <code>\`\`\``, inline: false })
            .setColor(0x4169e1);
        // Lastly, we want to send the new Code(s) into the Channel.
        return await await interaction.editReply({ embeds: [embed], ephemeral: true });
    },
};

