const { Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');
const ecoSchema = require('../../Schemas/economy');
var timeout = [];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('beg')
    .setDescription('Beg for some money.')
    .setDMPermission(false),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && timeout.includes(interaction.member.id)) return await interaction.reply({ content: 'You are on cooldown! You **cannot** execute /beg.', ephemeral: true})

        timeout.push(interaction.user.id);
        setTimeout(() => {
            timeout.shift();
        }, 10000)

        const  {user, guild} = interaction;

        let Data = await ecoSchema.findOne({ Guild: interaction.guild.id, User: user.id});

        if (!Data) return await interaction.reply({ content: `You **have not** opened an account yet, you cannot earn any money without an account :( \n> Do **/economy** to open your account.`, ephemeral: true});

        let negative = Math.round((Math.random() * -300) - 10)
        let positive = Math.round((Math.random() * +300) + 10)

        const posN = [negative, positive];

        const amount = Math.round((Math.random() * posN.length));
        const value = posN[amount];

        if (!value) return await interaction.reply({ content: `You were **rejected**. No money this time :(`, ephemeral: true});

        if (Data) {
            Data.Wallet += value;
            await Data.save();
        }

        if (value > 0) {

            const embed1 = new EmbedBuilder()
            .setColor("Yellow")
            .setThumbnail('https://media.discordapp.net/attachments/1058833929756479518/1197957603767095407/Asset_9.png?ex=65bd27f5&is=65aab2f5&hm=1dc34bbaae9dae650088f7aa2d43a6909352728039e5437f10fded40eed42528&=&format=webp&quality=lossless&width=676&height=676')
            .setTimestamp()
            .setFooter({ text: `<a:MTF_Credits:1082731156711149721> Begging Attempt`})
            .setAuthor({ name: `<a:MTF_Credits:1082731156711149721> Economy System`})
            .setTitle('> Begging Succeeded')
            .addFields({ name: `• Result`, value: `> The unknown gave you **$${value}**`})

            await interaction.reply({ embeds: [embed1] });
        } else {

            const stringv = `${value}`;

            const nonSymbol = await stringv.slice(1);

            const embed2 = new EmbedBuilder()
            .setColor("Yellow")
            .setThumbnail('https://media.discordapp.net/attachments/1058833929756479518/1197957603767095407/Asset_9.png?ex=65bd27f5&is=65aab2f5&hm=1dc34bbaae9dae650088f7aa2d43a6909352728039e5437f10fded40eed42528&=&format=webp&quality=lossless&width=676&height=676')
            .setTimestamp()
            .setFooter({ text: `<a:MTF_Credits:1082731156711149721> Begging Attempt`})
            .setAuthor({ name: `<a:MTF_Credits:1082731156711149721> Economy System`})
            .setTitle('> Begging was a Mistake')
            .addFields({ name: `• Result`, value: `> Begging is not always the option \n> deer, you lost **$${nonSymbol}**`})

            await interaction.reply({ embeds: [embed2]})
        }
    }
}