const {PermissionFlagsBits,
    EmbedBuilder,
    SlashCommandBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
    ChannelType
} = require(`discord.js`);
const roleSchema = require("../../Schemas/roleSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pickrole-message-create")
    .setDescription("Setup role pick messages.")
    .addStringOption(option =>
      option.setName("title")
        .setDescription("Title of the message.")
        .setRequired(true))
    .addStringOption(option =>
      option.setName("description")
        .setDescription("Description of the message.")
        .setRequired(true))
    .addChannelOption(option =>
      option.setName("channel")
        .setDescription("Send to which channel?")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText))
  
    .addStringOption(option => 
      option.setName('image')
      .setDescription("Attached photo (Use png link).")
      .setRequired(false))
  
    .addStringOption(option => 
      option.setName('thumbnail')
      .setDescription("Thumbnail image of the message (Use png link).")
      .setRequired(false)),
  
  async execute(interaction) {
    const { options } = interaction;

    // Permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: "\`❌\` You do not have (**\`Administrator\`**) permissions to use this commands!",
        ephemeral: true,
      });
    }

    const channel = options.getChannel("channel");
    const title = options.getString("title");
    const description = options.getString("description");
    const image = options.getString('image') || 'null';
    const thumbnail = interaction.options.getString('thumbnail') || 'null';
  

  const embed = new EmbedBuilder()
        .setTitle(title)
        .setColor('#2C2D31')
        .setDescription(`${description}`)
      
        .setTimestamp();

    if (image) {
                if (!image.startsWith('http') && image !== 'null') return await interaction.reply({ content: '\`⚠️\` **Image is invalid!**', ephemeral: true})
            }
    if (thumbnail) {
                if (!thumbnail.startsWith('http') && thumbnail !== 'null') return await interaction.reply({ content: '\`⚠️\` **Invalid thumbnail image!**', ephemeral: true})
            }
    
    if (image !== 'null') {
                embed.setImage(image)
            }
    
    if (thumbnail !== 'null') {
                embed.setThumbnail(thumbnail)
            }


      const mess = await channel.send({ embeds: [embed]});
      const messid = mess.id;

      const data = await roleSchema.create({
        Guild: interaction.guild.id,
        ChannelID: channel.id,
        MessageID: messid,
        Title: title,
        Description: description,
    });

    if (image !== 'null') {
       await roleSchema.findOneAndUpdate(
          {MessageID: messid}, {Image: image}, {new: true});
    }
    
    if (thumbnail !== 'null') {
       await roleSchema.findOneAndUpdate(
          {MessageID: messid}, {Thumbnail: thumbnail}, {new: true});
    }
    
    await interaction.reply({embeds: [
        new EmbedBuilder()
       .setColor("Green")
       .setDescription(`\`✅\` Successfully setup Pick Role Message.`)
       .addFields({name:'• Message ID', value: `${data.MessageID}`})
       .setTimestamp()
    ], ephemeral:true});
  },
};
