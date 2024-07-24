const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ecoSchema = require('../../Schemas/economy');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('deposit')
    .setDescription('Deposites specified amount of money from your wallet into your bank.')
    .setDMPermission(false)
    .addStringOption(option => option.setName('amount').setDescription('Specified amount of currency will be transfered to your bank.').setRequired(true)),
    async execute(interaction) {

        const amount = interaction.options.getString('amount');
        const { options, user, guild } = interaction;
        const Data = await ecoSchema.findOne({ Guild: interaction.guild.id, User: user.id });

        if (!Data) return await interaction.reply({ content: `You **do not** have an account to do that. \n> Do **/economy** to create an account.`, ephemeral: true});
        if (amount.startsWith('-')) return await interaction.reply({ content: `You **cannot** deposit negative values.`, ephemeral: true})

        if (amount.toLowerCase() === 'all') {
            if(Data.Wallet === 0) return await interaction.reply({ content: `You **can not** deposit any money because your wallet is **empty**.`, ephemeral: true});

            Data.Bank += Data.Wallet;
            Data.Wallet = 0;

            const embed1 = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle(`Deposit Successful`)
            .setAuthor({ name: `<a:MTF_Credits:1082731156711149721> Economy System`})
            .setDescription(`> ${user.username} has deposited all of \n> their money into their bank`)
            .setFooter({ text: '<a:MTF_Credits:1082731156711149721> Currency Deposited to Bank'})
            .setTimestamp()
            .setThumbnail('https://media.discordapp.net/attachments/1058833929756479518/1197957603767095407/Asset_9.png?ex=65bd27f5&is=65aab2f5&hm=1dc34bbaae9dae650088f7aa2d43a6909352728039e5437f10fded40eed42528&=&format=webp&quality=lossless&width=676&height=676')

            await Data.save();

            return await interaction.reply({ embeds: [embed1] })
        } else {
            const Converted = Number(amount);
            
            if(isNaN(Converted) === true) return await interaction.reply({ content: `The number inputed **is not valid**. \n> Inputed value must be a **number** or alternetely **all**.`, ephemeral: true});

            if (Data.Wallet < parseInt(Converted) || Converted === Infinity) return await interaction.reply({ content: `Eligible funds. You **cannot** transfer more than your **wallet**'s balance to your bank.`, ephemeral: true});

            Data.Bank += parseInt(Converted);
            Data.Wallet -= parseInt(Converted);
            Data.Wallet = Math.abs(Data.Wallet);

            await Data.save();

            const embed = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle(`Deposit Successful`)
            .setAuthor({ name: `<a:MTF_Credits:1082731156711149721> Economy System`})
            .setDescription(`> ${user.username} has deposited \n> $**${parseInt(Converted)}** into their bank`)
            .setFooter({ text: '<a:MTF_Credits:1082731156711149721> Currency Deposited to Bank'})
            .setTimestamp()
            .setThumbnail('https://media.discordapp.net/attachments/1058833929756479518/1197957603767095407/Asset_9.png?ex=65bd27f5&is=65aab2f5&hm=1dc34bbaae9dae650088f7aa2d43a6909352728039e5437f10fded40eed42528&=&format=webp&quality=lossless&width=676&height=676')

            return await interaction.reply({ embeds: [embed]})
        }

    }
}