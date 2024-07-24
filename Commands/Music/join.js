const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection, joinVoiceChannel } = require('@discordjs/voice');
const Settings = require('../../Models/247');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('247')
    .setDescription('Toggle 24/7 mode for the bot'),
  async execute(interaction) {
    const guildId = interaction.guild.id;
    let settings = await Settings.findOne({ guildId });

    if (!settings) {
      settings = await Settings.create({ guildId, is247Enabled: true });
    }

    settings.is247Enabled = !settings.is247Enabled;
    await settings.save();

    const status = settings.is247Enabled ? 'enabled' : 'disabled';
    await interaction.reply(`24/7 mode has been ${status} for this server.`);

    const voiceChannel = interaction.member.voice.channel;
    const connection = getVoiceConnection(guildId);

    if (settings.is247Enabled && voiceChannel && !connection) {
      const player = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      player.on('error', console.error);
    } else if (!settings.is247Enabled && connection) {
      connection.destroy();
    } else if (settings.is247Enabled && !voiceChannel) {
      await interaction.reply('You need to be in a voice channel to use this command.');
    }
  },
};
