const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require('discord.js');	
module.exports = {  
    premium :true,
		data:new SlashCommandBuilder()        
			.setName('potion-craft')
 				.setDescription('Brew some potions!'),
   					 async execute (interaction) {
        const potionembed = new EmbedBuilder()
        .setAuthor({ name: '🧙 Imagine being a Witch.'})
        .setTitle('Brew your own Potion!')
        .setDescription('> Use the buttons below to create your very own Potion. When you\'re done, click `Finish Potion`.')
        .setThumbnail('https://cdn.discordapp.com/attachments/1038800498318397461/1161989207305232455/Logo_500x500_px.png?ex=653a4dc7&is=6527d8c7&hm=5747c0a3b44afb52f9a933e5fb3dd448e78c1c10ca4133b4b46838469ea8904b&')
        .setFooter({ text: `${interaction.guild.name}'s Amateur Witch. 🧙`})

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button1')
            .setEmoji('<:mushrooms:1162033001660690613>')
            .setLabel('Mushroom')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('button2')
            .setEmoji('<:rattail:1162032271780499579>')
            .setLabel('Rat tail')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('button3')
            .setEmoji('<:dragonscales:1162032300578570440>')
            .setLabel('Dragon scales')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('button4')
            .setEmoji('<:dogfur:1162032331637399552>')
            .setLabel('Dog hair')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('button5')
            .setEmoji('<:wetsock:1162032568040964259>')
            .setLabel('Wet sock')
            .setStyle(ButtonStyle.Primary)
        )

        const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button6')
            .setEmoji('<:pfeather:1162032571761299476>')
            .setLabel('Phoenix feather')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('button7')
            .setEmoji('<:spidey:1162032575687180308>')
            .setLabel('Spider')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('button8')
            .setEmoji('<:froggo:1162032579411705966>')
            .setLabel('Froggo')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('button9')
            .setEmoji('<:zhand:1162032582909775923>')
            .setLabel('Zombie hand')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('button10')
            .setEmoji('<:brian:1162032586206482525>')
            .setLabel('Brain')
            .setStyle(ButtonStyle.Primary)
        )

        const row3 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button11')
            .setEmoji('<:humenskol:1162032590165905479>')
            .setLabel('Human skull')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('button12')
            .setEmoji('<a:AUSC_prettyodd:1037934178878107681>')
            .setLabel('Eye balls')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('finish')
            .setEmoji('✅')
            .setLabel('Finish Potion')
            .setStyle(ButtonStyle.Success)
        )

        await interaction.reply({ content: `Let's start making something special!`, ephemeral: true });

        await interaction.channel.send({ embeds: [potionembed], components: [row, row2, row3] });
    }
}