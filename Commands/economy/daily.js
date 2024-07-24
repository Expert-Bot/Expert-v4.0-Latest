const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ecoS = require('../../Schemas/economy');
 
var timeout = [];
 
module.exports = {
    data: new SlashCommandBuilder()
    .setDMPermission(false)
    .setName('daily')
    .setDescription('Allows you to claim a random amount of currency each day.'),
 
    async execute(interaction) {
        const { options, guild, user } = interaction;
        
        let data = await ecoS.findOne({ Guild: guild.id, User: user.id });
 
        if (timeout.includes(interaction.user.id) && interaction.user.id !== '903237169722834954') return await interaction.reply({ content: "You have **already** claimed your daily amount! Please check back **later**.", ephemeral: true });
 
        if (!data) return await interaction.reply({ content: "You **do not** have an account yet! \n> Do **/economy** to configure your account.", ephemeral: true });
        else {
            const randAmount = Math.round((Math.random() * 3000) + 10);
 
            data.Wallet += randAmount;
            data.save();
 
            const embed = new EmbedBuilder()
                .setAuthor({ name: `<a:MTF_Credits:1082731156711149721> Economy System`})
                .setFooter({ text: `<a:MTF_Credits:1082731156711149721> Daily Claimed`})
                .setColor('Yellow')
                .setTitle('> Daily Allowance Claimed')
                .setThumbnail('https://media.discordapp.net/attachments/1058833929756479518/1197957603767095407/Asset_9.png?ex=65bd27f5&is=65aab2f5&hm=1dc34bbaae9dae650088f7aa2d43a6909352728039e5437f10fded40eed42528&=&format=webp&quality=lossless&width=676&height=676')
                .setDescription(`• Amount: **$${randAmount}**\n• Next claim available: **12 hours**`)
                .setTimestamp();
 
            await interaction.reply({ embeds: [embed] });
 
            timeout.push(interaction.user.id);
            setTimeout(() => {
                timeout.shift();
            }, 43200000);
        }
    }
}