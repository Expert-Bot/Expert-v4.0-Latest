const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName ('ai-bard')
    .setDescription ('Ask BardAI a question!')
    .addStringOption (option => option.setName('question').setDescription('Enter your question here:').setRequired(true)),
    async execute (interaction) {
 
        await interaction.deferReply({ ephermal: true});
 
        const {options} = interaction;
        const question = options.getString('question');
        const apikey = '';
 
        const input = {
            method: 'GET',
            url: 'https://google-bard1.p.rapidapi.com/v1/gemini/gemini-pro',
            headers: {
                text: question,
                api_key: apikey, // Use your Generative Language API Key here
                'X-RapidAPI-Key': '454b8e539cmsh5fa0b025fa0d155p1102f3jsn570e16c1acc9', // Use your RapidAPI Key here
                'X-RapidAPI-Host': 'google-bard1.p.rapidapi.com'
            }
        };
 
        try {
            const output = await axios.request(input);
 
            const embed = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle('Google Bard')
            .setThumbnail(interaction.client.user.displayAvatarURL({ size: 128 }))
            .setDescription(output.data.response)
            .setTimestamp()
            .setFooter({ text: `Powered by GoogleAPIs and RapidAPI` });
 
            await interaction.editReply({ embeds: [embed ]});
        } catch (e) {
            return await interaction.editReply({ content: `There was an issue getting a response. Please try again later!` });
        }
 
    }
}