const { SlashCommandBuilder, ChatInputCommandInteraction, Client, ActionRowBuilder, SelectMenuBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("disable-aichat")
        .setDescription("Setup the AI Chat.")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
         if(client.settings.has(interaction.guild.id)) {
            if(client.settings.get(interaction.guild.id, "aichat")) {
                client.settings.set(interaction.guild.id, false, "aichat.enabled")
                 
                return await interaction.reply({ content: `Successfuly disabled the AI Chat.`})
            } else {
                return await interaction.reply({ content: `You don't have the AI Chat enabled in your server.`})
            }
         }

        

    }
}