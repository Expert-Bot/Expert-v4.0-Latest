const { //imports for discord.js
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
    Events,
    MessageEmbed, // Change EmbedBuilder to MessageEmbed
    permissions,
    voiceschemas,
    AttachmentBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ModalBuilder,
    TextInputBuilder,
    PermissionsBitField,
    TextInputStyle,
    commands,
    Options,
    MessageActionRow,
    MessageButton,
    EmbedBuilder,
    Embed,
    ActivityType
  } = require("discord.js");
  const Discord = ('discord.js')
  const { MessageAttachment } = require('discord.js')
  const warnFilePath = './warns.json';
  const { svg2png } = require('svg2png')
  const { DisTube } = require("distube");
  const config = require('./config.json');
  //const { SpotifyPlugin } = require('@distube/spotify');
  const translate = require('@iamtraction/google-translate');
  const { SoundCloudPlugin } = require('@distube/soundcloud');
  const { YtDlpPlugin } = require('@distube/yt-dlp');
  const { handleLogs } = require('./Handlers/handleLogs');
  const { handler } = require('./Handlers/handler');
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v9');
  const fs = require('fs');
  const logs = require('discord-logs');
  const Topgg = require('@top-gg/sdk');
  const prefix = '?'; // Your bot's command prefix
  const axios = require('axios');
  const fetch = require('node-fetch');
  const readdirSync = require('fs');
  const banschema = require('./Schemas/ban.js');
  const messageLogging = require('./Handlers/messageLogging');
  const { ChannelType } = require('discord.js');
  //use this if your bot on top.gg
  const topggAPI = new Topgg.Api('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMjM4MTA3MTUyNTA4NjAxMDUiLCJib3QiOnRydWUsImlhdCI6MTY5NTQ2Njk0NX0.Gsc7utYgXzD_BZ04NafnBLKLprokL6pOL4bnIT2-xHw'); // If your bot added in top.gg line (1492) uncoment other function
  const { loadEvents } = require("./Handlers/eventHandler");
  const { loadCommands } = require("./Handlers/commandHandler");
  const { loadModals } = require("./Handlers/modalHandler");
  const { loadButtons } = require("./Handlers/buttonHandler");
  const { LoadErrorHandler } = require("./Handlers/ErrorHandler");
  const { loadComponents } = require('./Handlers/ComponentsHandler');
  const { OpenAIApi, Configuration } = require("openai");
  const { CaptchaGenerator } = require('captcha-canvas');
  const modschema = require('./Schemas/modmailschema.js'); // Import the modschema model
  const moduses = require ('./Schemas/modmailuses.js')
  const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
    makeCache: Options.cacheWithLimits({
      MessageManager: { maxSize: 0 },
      PresenceManager: { mazSize: 0 },
    }),
      ctivities: [{
            type: ActivityType.Custom,
            name: "irrelevant", // name is exposed through the API but not shown in the client for ActivityType.Custom
            state: "🎉 Custom Status"
        }],
    allowedMentions: { parse: ["users", "roles", "everyone"] },
  });
  client.setMaxListeners(50);
  ///reaction role system//

  //reactionrole
const reactSchema = require("./Schemas/reactionrole");
client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.customId === "reactionrole") {
        const guild = interaction.guild.id;
        const message = interaction.message.id;
        const reactchannel = interaction.channel.id;
 
        const reactData = await reactSchema.findOne({
            Guild: guild,
            Message: message,
            Channel: reactchannel
        })
 
        if (!reactData) {
            return;
        } else if (reactData) {
            //Role ID
            const ROLE_ID = reactData.Role;
            //try add/remove role
            try {
                const targetMember = interaction.member;
                const role = interaction.guild.roles.cache.get(ROLE_ID);
                if (!role) {
                  interaction.reply({
                    content: 'Role not found.',
                    ephemeral: true
                  });
                }
                if (targetMember.roles.cache.has(ROLE_ID)) {
                    targetMember.roles.remove(role).catch(err => {console.log(err)});
                  interaction.reply({
                    content: `Removed the role ${role} from ${targetMember}.`,
                    ephemeral: true
                  });
                } else {
                  await targetMember.roles.add(role).catch(err => {console.log(err)});;
                  interaction.reply({
                    content: `Added the role ${role} to ${targetMember}.`,
                    ephemeral: true
                  });
                }
              } catch (error) {
                //catch the error
                console.log(error);
                interaction.reply('An error occurred while processing the command.');
            }
        }
    }
})
//---- PİCK BUTTON ROLE SYSTEM ----//
client.on(Events.InteractionCreate, async (interaction) => {

  const { customId, guild, channel, member, message } = interaction;   
  if (!interaction.isButton()) return;
  
  const roleSchema = require("./Schemas/roleSchema");

  const data = await roleSchema.findOne({
    Guild: guild.id,
    MessageID: message.id
  });

  if (customId === 'role-1') {
    if (!data) return interaction.reply(`\`📛\` Error database!`);
    
    const role = guild.roles.cache.get(data.RoleID1);
    
    if (role && member.roles.cache.has(data.RoleID1)) {
      member.roles.remove(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` ${role} role removed!`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else if (role) {
      member.roles.add(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` You have chosen the ${role} role.`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else {
      interaction.reply(`\`⚠️\` Role does not exist!`);
    }
  }

  if (customId === 'role-2') {
    if (!data) return interaction.reply(`\`📛\` Error database!`);
    
    const role = guild.roles.cache.get(data.RoleID2);
    
    if (role && member.roles.cache.has(data.RoleID2)) {
      member.roles.remove(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` ${role} role removed!`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else if (role) {
      member.roles.add(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` You have chosen the ${role} role.`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else {
      interaction.reply(`\`⚠️\` Role does not exist!`);
    }
  }

  if (customId === 'role-3') {
    if (!data) return interaction.reply(`\`📛\` Error database!`);
    
    const role = guild.roles.cache.get(data.RoleID3);
    
    if (role && member.roles.cache.has(data.RoleID3)) {
      member.roles.remove(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` ${role} role removed!`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else if (role) {
      member.roles.add(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` You have chosen the ${role} role.`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else {
      interaction.reply(`\`⚠️\` Role does not exist!`);
    }
  }

  if (customId === 'role-4') {
    if (!data) return interaction.reply(`\`📛\` Error database!`);
    
    const role = guild.roles.cache.get(data.RoleID4);
    
    if (role && member.roles.cache.has(data.RoleID4)) {
      member.roles.remove(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` ${role} role removed!`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else if (role) {
      member.roles.add(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` You have chosen the ${role} role.`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else {
      interaction.reply(`\`⚠️\` Role does not exist!`);
    }
  }

  if (customId === 'role-5') {
    if (!data) return interaction.reply(`\`📛\` Error database!`);
    
    const role = guild.roles.cache.get(data.RoleID5);
    
    if (role && member.roles.cache.has(data.RoleID5)) {
      member.roles.remove(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` ${role} role removed!`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else if (role) {
      member.roles.add(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` You have chosen the ${role} role.`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else {
      interaction.reply(`\`⚠️\` Role does not exist!`);
    }
  }

  if (customId === 'role-6') {
    if (!data) return interaction.reply(`\`📛\` Error database!`);
    
      member.roles.add(role);
    const role = guild.roles.cache.get(data.RoleID6);
    
    if (role && member.roles.cache.has(data.RoleID6)) {
      member.roles.remove(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` ${role} role removed!`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else if (role) {

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` You have chosen the ${role} role.`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else {
      interaction.reply(`\`⚠️\` Role does not exist!`);
    }
  }

  if (customId === 'role-7') {
    if (!data) return interaction.reply(`\`📛\` Error database!`);
    
    const role = guild.roles.cache.get(data.RoleID7);
    
    if (role && member.roles.cache.has(data.RoleID7)) {
      member.roles.remove(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` ${role} role removed!`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else if (role) {
      member.roles.add(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` You have chosen the ${role} role.`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else {
      interaction.reply(`\`⚠️\` Role does not exist!`);
    }
  }

  if (customId === 'role-8') {
    if (!data) return interaction.reply(`\`📛\` Error database!`);
    
    const role = guild.roles.cache.get(data.RoleID8);
    
    if (role && member.roles.cache.has(data.RoleID8)) {
      member.roles.remove(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` ${role} role removed!`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else if (role) {
      member.roles.add(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` You have chosen the ${role} role.`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else {
      interaction.reply(`\`⚠️\` Role does not exist!`);
    }
  }

  if (customId === 'role-9') {
    if (!data) return interaction.reply(`\`📛\` Error database!`);
    
    const role = guild.roles.cache.get(data.RoleID9);
    
    if (role && member.roles.cache.has(data.RoleID9)) {
      member.roles.remove(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` ${role} role removed!`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else if (role) {
      member.roles.add(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` You have chosen the ${role} role.`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else {
      interaction.reply(`\`⚠️\` Role does not exist!`);
    }
  }

  if (customId === 'role-10') {
    if (!data) return interaction.reply(`\`📛\` Error database!`);
    
    const role = guild.roles.cache.get(data.RoleID10);
    
    if (role && member.roles.cache.has(data.RoleID10)) {
      member.roles.remove(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` ${role} role removed!`);
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else if (role) {
      member.roles.add(role);

      const embed1 = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`\`✅\` You have chosen the ${role} role.`);
        
      interaction.reply({ embeds: [embed1], ephemeral: true });
    } else {
      interaction.reply(`\`⚠️\` Role does not exist!`);
    }
  }
})

//animated logo//

  //chat//
  client.on('messageCreate', async (message) => {
    
    if(message.guild) return;
    await client.channels.cache.get('1192469305665785959').send(` **New DM Received** \n**By** - ${message.author} \n**Message** - ${message.content} `);
    
    return;
});




////error jandler//
const errorHandling = require("discord.js-anticrash");

const configg = {
  webhookUrl: 'https://discord.com/api/webhooks/1107776878615474208/g_2MV2f78JkZjktFr_7Kw66o1dIidJ3il3aPwlbkQUWW8ZAPBz93breP32yrI_AjEZzi',
  embedColor: "#ff0000", // Optional
  embedTitle: "Error", // Optional
  embedAvatarUrl: "https://cdn.discordapp.com/avatars/1023810715250860105/a_22c18bd0084b1ec987598aa5a927647d.gif?size=2048", // Optional
  webhookUsername: "Error", // Optional
};

errorHandling(client, config);

  ////join dm owner//
  
  
  
  client.on('guildCreate', async (guild) => {
    try {
      const owner = await guild.members.fetch(guild.ownerId);
  
      if (owner) {
        const embed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle('Thank You for Adding Me!')
          .setDescription(`<:utility12:1082695146560307281>Thanks for adding me to your server, ${owner.user.username}!`)
           .addFields(
            { name: 'How to Use Me', value: '<:reply_end:1111372039463374880>You Can use me Via Slash command or prefix But Prefix Is Beta Now' }
            // Add more fields as needed
          );
        owner.send({ embeds: [embed] });
        console.log(`Sent thank-you message to ${owner.user.tag}`);
      }
    } catch (error) {
      console.error(`Error sending thank-you message: ${error.message}`);
    }
  });
  
  ///rempve dm ////
  
  
  client.on('guildDelete', async (guild) => {
    try {
      const owner = await guild.members.fetch(guild.ownerId);
  
      if (owner) {
        const embed = new EmbedBuilder()
          .setColor('#ff0000')
          .setTitle('Goodbye!')
          .setDescription(`<:1984icondelete:1117884114259951636>I was removed from your server, ${owner.user.username}. KICKED ME MISTAKENLY?, Here you can [Add Me](https://top.gg/bot/1023810715250860105).`);
  
        owner.send({ embeds: [embed] });
        console.log(`Sent farewell message to ${owner.user.tag}`);
      }
    } catch (error) {
      console.error(`Error sending farewell message: ${error.message}`);
    }
  });
  //uncomnet this if you want to use bardai system 
  ///end ////
  client.on(Events.MessageCreate, async message => {
      if (message.channel.type === ChannelType.DM) {
          if (message.author.bot) return;
  
          await message.channel.sendTyping();
  
          let input = {
              method: 'GET',
              url: 'https://google-bard1.p.rapidapi.com/',
              headers: {
                  text: message.content,
                  'x-RapidAPI-key': '454b8e539cmsh5fa0b025fa0d155p1102f3jsn570e16c1acc9',	
                  'x-RapidAPI-Host': 'google-bard1.p.rapidapi.com',
              }
          };
  
          try {
              const output = await axios.request(input);
              const response = output.data.response;
  
              if (response.length > 2000) {
                  const chunks = response.match(/.{1,2000}/g);
  
                  for (let i = 0; i < chunks.length; i++) {
                      await message.author.send(chunks[i]).catch(err => {
                          message.author.send("I am having a hard time finding that request! Because I am an AI on Discord, I might have trouble with long requests.").catch(err => {});
                      });
                  }
              } else {
                  await message.author.send(response).catch(err => {
                      message.author.send("I am having a hard time finding that request! Because I am an AI on Discord, I might have trouble with long requests.").catch(err => {});
                  });
              }
          } catch (e) {
              console.log(e);
              message.author.send("I am having a hard time finding that request! Because I am an AI on Discord, I might have trouble with long requests.").catch(err => {});
          }
      } else {
          return;
      }
  });
  ///prefix system//
  
  client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    if (command === 'devtest') {
      const replyMessage = `The bot is working and online!\n My Prefix is: ${prefix}\n My Ping is: ${client.ws.ping}ms\n My Uptime is: ${client.uptime}ms\n I am in ${client.guilds.cache.size} servers!`;
      message.reply(replyMessage);
    }
  });
  
  client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    if (command === 'dev') {
      const replyMessage = `The bot is owned by:\n- shykh69\n- typedrago\n\nDeveloped by:\n- Hotsuop\n- Titsou™!`;
      message.reply(replyMessage);
    }
  });
  // Random memme with ?meme
  client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === '?meme') {
      try {
        const response = await fetch('https://www.reddit.com/r/memes/random/.json');
        const data = await response.json();
        const meme = data[0].data.children[0].data;
  
        const memeTitle = meme.title;
        const memeImage = meme.url;
  
        message.channel.send({ content: memeTitle, files: [memeImage] });
      } catch (error) {
        console.error('Error fetching the meme:', error);
        message.reply('There was an error while fetching the meme.');
      }
    }
  });
  // sunset image with ?sunset
  client.on('ready', () => {
  });
  
  client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === '?sunset') {
      try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=sunset&orientation=landscape&client_id=dO6I6GGAh84-fQdTHpAUH2kzeLbd2rxALb-GUL9a7Ic`);
        const data = await response.json();
        const sunsetImage = data.urls.regular;
  
        message.channel.send(sunsetImage);
      } catch (error) {
        console.error('Error fetching the sunset image:', error);
        message.reply('There was an error while fetching the sunset image.');
      }
    }
  });
  // weather commannd
  client.on('messageCreate', async (message) => {
    if (message.content.startsWith('?weather')) {
      const args = message.content.split(' ');
      if (args.length < 2) {
        message.reply('Please specify a location. Example: `?weather London`');
        return;
      }
  
      args.shift(); // Remove the command ('?weather')
      const location = args.join(' '); // Join the remaining args as the location
  
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=cde77657814616656ba0de9fec623ed1&units=metric`);
        const weatherData = response.data;
  
        const weatherDescription = weatherData.weather[0].description;
        const temperature = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
  
        const weatherInfo = `Weather in ${location}: ${weatherDescription}\nTemperature: ${temperature}°C\nHumidity: ${humidity}%\nWind Speed: ${windSpeed} m/s`;
  
        message.channel.send(weatherInfo);
      } catch (error) {
        console.error('Error fetching weather:', error);
        message.reply('There was an error while fetching the weather - Did you spell the location correctly?');
      }
    }
  });
  // server info (prefix)
  client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === '?serverinfo') {
      const guild = message.guild;
  
      if (!guild) {
        console.error('Guild not found.');
        return;
      }
  
      const name = guild.name;
      const memberCount = guild.memberCount;
      const owner = guild.ownerId;
      const serverAge = `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`;
  
      const embed = {
        color: 0x00ff00, // Green color in decimal format (you can change this)
        title: 'Server Information',
        fields: [
          { name: 'Server Name', value: `> ${name}` },
          { name: 'Server Member Count', value: `> ${memberCount}` },
          { name: 'Server Owner', value: `> ${owner}` },
          { name: 'Server Age', value: `> ${serverAge}` }
        ],
        timestamp: new Date()
      };
  
      try {
        await message.channel.send({ embeds: [embed] });
      } catch (error) {
        console.error('Error sending embed:', error);
        message.reply('There was an error while sending the server information.');
      }
    }
  });
  // above is weather
  // help command
  // is here down
  
  /* const commandsList = [
    {
      name: 'serverinfo',
      description: 'Get information about the server',
      usage: '?serverinfo',
      category: 'Info',
    },
    {
      name: 'meme',
      description: 'Fetch a random meme',
      usage: '?meme',
      category: 'Fun',
    },
    {
      name: 'sunset',
      description: 'Get a random sunset image',
      usage: '?sunset',
      category: 'Image',
    },
    {
      name: 'weather',
      description: 'Get weather information for a location',
      usage: '?weather <location>',
      category: 'Info',
    },
    {
      name: 'translate',
      description: 'Translate text to a target language',
      usage: '?translate <text> <target_language>',
      category: 'Utilities',
    },
    {
      name: 'slowmode',
      description: 'Set channel slow mode',
      usage: '?slowmode <seconds>',
      category: 'Utilities',
    },
    {
      name: 'joke',
      description: 'Get a random joke',
      usage: '?joke',
      category: 'Fun',
    },
    {
      name: 'ask',
      description: 'Ask the AI a question',
      usage: '?ask <your_question>',
      category: 'Utilities',
    },
    // Add more commands as needed
  ];
  
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };
  
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
  
    if (message.content.toLowerCase() === '?showhelp') {
      // Display categories for help
      const categories = [...new Set(commandsList.map((command) => command.category))];
      const embed = new EmbedBuilder()
        .setColor('#3498db')
        .setTitle('Command Categories')
        .setDescription('List of available categories:')
        .addFields(categories.map((category) => {
          return { name: category, value: `Use ?help ${category.toLowerCase()} for commands in this category` };
        }));
      message.channel.send({ embeds: [embed] });
    } else {
      // Handle commands based on categories
      const commandCategory = message.content.toLowerCase().split(' ')[1];
      const filteredCommands = commandsList.filter((command) =>
        command.category.toLowerCase() === commandCategory.toLowerCase());
  
    
  
      const pages = chunkArray(filteredCommands, 5);
      let currentPage = 0;
  
      const embed = new EmbedBuilder()
        .setColor('#3498db')
        .setTitle(`Commands in ${commandCategory}`)
        .setDescription('List of available commands:')
        .setFooter({ text: `Page ${currentPage + 1}/${pages.length}` });
  
      embed.addFields(pages[currentPage].map((command) => {
        return { name: command.name, value: `**Description:** ${command.description}\n**Usage:** ${command.usage}` };
      }));
  
      const helpMessage = await message.channel.send({ embeds: [embed] });
  
      if (pages.length > 1) {
        await helpMessage.react('⬅️');
        await helpMessage.react('➡️');
      }
  
      const filter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
      const collector = helpMessage.createReactionCollector({ filter, time: 60000 });
  
      collector.on('collect', async (reaction) => {
        reaction.users.remove(message.author).catch(console.error);
  
        if (reaction.emoji.name === '➡️' && currentPage < pages.length - 1) {
          currentPage++;
        } else if (reaction.emoji.name === '⬅️' && currentPage > 0) {
          currentPage--;
        }
  
        embed.fields = [];
        embed.setFooter({ text: `Page ${currentPage + 1}/${pages.length}` });
  
        embed.addFields(pages[currentPage].map((command) => {
          return { name: command.name, value: `**Description:** ${command.description}\n**Usage:** ${command.usage}` };
        }));
  
        await helpMessage.edit({ embeds: [embed] });
      });
  
      collector.on('end', () => {
        helpMessage.reactions.removeAll().catch(console.error);
      });
    }
  }); */
  //translate modual
  
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(`?help`)) {
      // this is the code for the embeds that you will see 
      let embeds = [
        new EmbedBuilder().setTitle(`📘 **Help Menu**`).setDescription(`Welcome to the help menu. Use the buttons below to navigate between pages.`).setFields({ name: 'Command', value: '?help and /help', inline: true }, { name: 'Description', value: 'Gives this help menu', inline: true }),
        new EmbedBuilder().setTitle(`Info commands`).setDescription(`Info commands!`).setFields({ name: 'Command', value: '?Serverinfo\n?weather <location>\n?ping', inline: true }, { name: 'Description', value: 'Gives server info\nGives weather info for a location\n Gives the bots ping', inline: true }),
        new EmbedBuilder().setTitle(`Image commands!`).setDescription(`Image commands!`).setFields({ name: 'Command', value: '?meme\n?sunset\n\n i will be adding more soon!', inline: true }, { name: 'Description', value: 'Gives a meme\nGives the sunset time of a location\n\n i will be adding more soon!', inline: true }),
        new EmbedBuilder().setTitle(`Utility commands!`).setDescription(`Utility commands!`).setFields({ name: 'Command', value: '?avatar\n?servericon\n?serverinfo\n?userinfo', inline: true }, { name: 'Description', value: 'Gives the avatar of the member\nGives the server icon\nGives the server info\nGives the user info', inline: true }),
        new EmbedBuilder().setTitle(`Ai commands!`).setDescription(`Ai commands!`).setFields({ name: 'Command', value: '?ask <text>', inline: true }, { name: 'Description', value: 'Chat with the ai!', inline: true }),
        new EmbedBuilder().setTitle(`Admin commands`).setDescription(`Admin commands!`).setFields({ name: 'Command', value: '?kick\n?ban\n?mute \n?unmute\n?chatsave\n?addrole\n?removerole\n?slowmode', inline: true }, { name: 'Description', value: 'Kicks a member\nBans a member\nMutes a member\nUnmutes a member\nsaves the last 100 messages of the chat and sends it as an html file.\n adds a role\n removes a role\n Sets the slowmode of the channel', inline: true }),
        new EmbedBuilder().setTitle(`Support and Invite`).setDescription(`If you need help, you can join the support server. You can also invite the bot to your server.`).setFields({ name: 'Support Server', value: 'https://discord.gg/DYhTZdpznE', inline: true }, { name: 'Invite', value: '[Click here to add the bot to your server!](https://discord.com/api/oauth2/authorize?client_id=1180863896773468351&permissions=8&scope=bot%20applications.commands)', inline: true }),
        new EmbedBuilder().setTitle(`Credits for develpoping this bot`).setDescription(`Thanks to all who gave me ideas! Most namely <@!1178075092815716503>`).setFields({ name: 'Owners', value: '<@!903237169722834954>\n<@!930450658971234326>\n<@!804418829065125909>', inline: true },{ name: 'Devs', value: '<@!969655699154042940>\n<@!1175040737784643637>\n<@!487546381033013249>', inline: true },{name: 'Feature suggestions', value: 'Ps if you want to give me an idea/feature suggestion send me a dm! Or join our support server and say in chat!', inline: false },{ name: 'Support Server', value: 'https://discord.gg/DYhTZdpznE', inline: true }, { name: 'Invite', value: '[Click here to add the bot to your server!](https://discord.com/api/oauth2/authorize?client_id=845041532694199838&permissions=8&scope=bot%20applications.commands)', inline: true }),
      ];
      await pagination(message, embeds);
    }
  });
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Array} embeds
   * Below is the code for the buttons
   */
  async function pagination(interaction, embeds) {
    let allbuttons = new ActionRowBuilder().addComponents([
      new ButtonBuilder().setStyle(2).setCustomId("0").setLabel("<<"),
      new ButtonBuilder().setStyle(2).setCustomId("1").setLabel("<"),
      new ButtonBuilder().setStyle(2).setCustomId("2").setLabel("x"),
      new ButtonBuilder().setStyle(2).setCustomId("3").setLabel(">"),
      new ButtonBuilder().setStyle(2).setCustomId("4").setLabel(">>"),
    ]);
    // send message if embeds is 1
    if (embeds.length === 1) {
      if (interaction.deferred) {
        return interaction.followUp({
          title: "Your Embed Title",
      description: "Your Embed Description",

          embeds: [embeds[0]],
        });
      } else {
        return interaction.reply({
          title: "Your Embed Title",
      description: "Your Embed Description",

          embeds: [embeds[0]],
          fetchReply: true,
        });
      }
    }
  
    embeds = embeds.map((embed, index) => {
      return embed.setFooter({
        text: `Page ${index + 1}/${embeds.length} - Expert help menu`,
        iconURL: interaction.guild.iconURL({ dynamic: true }),
      });
    });
  
    let sendMsg;
    if (interaction.deferred) {
      sendMsg = await interaction.followUp({
        title: "Your Embed Title",
      description: "Your Embed Description",

        embeds: [embeds[0]],
        components: [allbuttons],
      });
    } else {
      sendMsg = await interaction.reply({
        title: "Your Embed Title",
      description: "Your Embed Description",

        embeds: [embeds[0]],
        components: [allbuttons],
      });
    }
  
    let filter = (m) => m.member.id === interaction.member.id;
  
    const collector = await sendMsg.createMessageComponentCollector({
      filter: filter,
      time: 30000,
    });
    let currentPage = 0;
    collector.on("collect", async (b) => {
      if (b.isButton()) {
        await b.deferUpdate().catch((e) => null);
        // page first
        switch (b.customId) {
          case "0":
            {
              if (currentPage != 0) {
                currentPage = 0;
                await sendMsg
                  .edit({
                    embeds: [embeds[currentPage]],
                    components: [allbuttons],
                  })
                  .catch((e) => null);
              }
            }
            break;
          case "1":
            {
              if (currentPage != 0) {
                currentPage -= 1;
                await sendMsg
                  .edit({
                    embeds: [embeds[currentPage]],
                    components: [allbuttons],
                  })
                  .catch((e) => null);
              } else {
                currentPage = embeds.length - 1;
                await sendMsg
                  .edit({
                    embeds: [embeds[currentPage]],
                    components: [allbuttons],
                  })
                  .catch((e) => null);
              }
            }
            break;
          case "2":
            {
              allbuttons.components.forEach((btn) => btn.setDisabled(true));
              await sendMsg
                .edit({
                  embeds: [embeds[currentPage]],
                  components: [allbuttons],
                })
                .catch((e) => null);
            }
            break;
          case "3":
            {
              if (currentPage < embeds.length - 1) {
                currentPage++;
                await sendMsg
                  .edit({
                    embeds: [embeds[currentPage]],
                    components: [allbuttons],
                  })
                  .catch((e) => null);
              } else {
                currentPage = 0;
                await sendMsg
                  .edit({
                    embeds: [embeds[currentPage]],
                    components: [allbuttons],
                  })
                  .catch((e) => null);
              }
            }
            break;
          case "4":
            {
              currentPage = embeds.length - 1;
              await sendMsg
                .edit({
                  embeds: [embeds[currentPage]],
                  components: [allbuttons],
                })
                .catch((e) => null);
            }
            break;
  
          default:
            break;
        }
      }
    });
  
    collector.on("end", async () => {
      allbuttons.components.forEach((btn) => btn.setDisabled(true));
      await sendMsg
        .edit({
          embeds: [embeds[currentPage]],
          components: [allbuttons],
        })
        .catch((e) => null);
    });
  }
  // server icon
  client.on('messageCreate', async (message) => {
    if (!message.guild || message.author.bot) return;
  
    const args = message.content.trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    if (command === '?servericon') {
      const embed = new EmbedBuilder()
        .setColor('#3498db')
        .setTitle(`Icon of ${message.guild.name}`)
        .setImage(message.guild.iconURL({ dynamic: true, size: 4096 }))
        .setTimestamp();
  
      message.channel.send({ embeds: [embed] });
    }
  });
  //
/*client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
  
    const args = message.content.toLowerCase().split(' ');
  
    if (args[0] === '?translate') {
      const text = args.slice(1, -1).join(' ');
      const targetLanguage = args[args.length - 1];
  
      if (!text || !targetLanguage) {
        return message.reply('Please provide text and the target language for translation.');
      }
  
      try {
        const translation = await translate(text, { to: targetLanguage });
  
        const translatedText = translation.text ? translation.text : 'Unable to translate';
  
        const embed = new EmbedBuilder()
          .setTitle('Translation')
          .setDescription(`**Original:** ${text}\n**Translated:** ${translatedText}`)
          
          .setColor('#00FFFF')
          .setFooter('Translated using Google Translate');
  
        message.channel.send({ embeds: [embed] });
      } catch (error) {
        console.error('Error translating text:', error);
        message.reply('An error occurred while translating the text.');
      }
    }
  });*/    
  //Slow mode
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
  
    const args = message.content.toLowerCase().split(' ');
  
    if (args[0] === '?slowmode') {
      if (!message.member.permissions.has('MANAGE_CHANNELS')) {
        return message.reply('You do not have permission to use this command.');
      }
  
      const seconds = parseInt(args[1]);
  
      if (!seconds || isNaN(seconds)) {
        return message.reply('Please provide a valid number of seconds for slow mode.');
      }
  
      if (seconds < 0 || seconds > 21600) {
        return message.reply('Slow mode duration must be between 0 and 21600 seconds (6 hours).');
      }
  
      try {
        await message.channel.setRateLimitPerUser(seconds);
        message.reply(`Slow mode set to ${seconds} seconds.`);
      } catch (error) {
        console.error('Error setting slow mode:', error);
        message.reply('An error occurred while setting slow mode.');
      }
    }
  });
  // brain shop ai 
  client.on('messageCreate', async message => {
    if (!message.guild) return; // Ignore messages from DMs
    if (message.author.bot) return; // Ignore messages from bots
  
    if (message.content.startsWith(`${prefix}ask`)) {
        const prompt = message.content.slice(`${prefix}ask`.length).trim();
        
        try {
            const url = `${config.brainShopApiUrl}?bid=${config.brainShopBotId}&key=${config.brainShopApiKey}&uid=1&msg=${encodeURIComponent(prompt)}`;
            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json();
                const answer = data.cnt;
  
                await message.reply(`The AI says: ${answer}`);
            } else {
                throw new Error('Failed to fetch data from BrainShop API');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            await message.reply('An error occurred while processing your request.');
        }
    }
  });
  // joke
  client.on('messageCreate', async message => {
    if (!message.guild) return; // Ignore DMs
    if (message.author.bot) return; // Ignore bots
  
    if (message.content === `${prefix}joke`) {
        try {
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
            
            if (response.ok) {
                const jokeData = await response.json();
                const joke = jokeData.joke;
  
                await message.reply(`Here's a joke: ${joke}`);
            } else {
                throw new Error('Failed to fetch joke from the API');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            await message.reply('An error occurred while fetching the joke.');
        }
    }
  });
  // warn and warns checking and sending
  
  if (!fs.existsSync(warnFilePath)) {
    fs.writeFileSync(warnFilePath, JSON.stringify({}));
  }
  
  client.on('messageCreate', async message => {
    if (!message.guild || message.author.bot) return;
  
    const prefix = '?';
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();
  
    if (command === 'warn') {
      if (args.length < 2) {
        return message.reply('Please provide a user and a reason for the warning.');
      }
  
      const user = message.mentions.users.first();
      if (!user) {
        return message.reply('Please mention the user you want to warn.');
      }
  
      const reason = args.slice(1).join(' ');
  
      const warnings = JSON.parse(fs.readFileSync(warnFilePath, 'utf-8'));
  
      warnings[user.id] = warnings[user.id] || [];
  
      warnings[user.id].push({
        moderator: message.author.tag,
        reason,
        timestamp: new Date().toUTCString()
      });
  
      fs.writeFileSync(warnFilePath, JSON.stringify(warnings, null, 2));
  
      message.reply(`Successfully warned ${user.tag} for: ${reason}`);
    }
  
    if (command === 'warns') {
      const user = message.mentions.users.first();
      if (!user) {
        return message.reply('Please mention the user to check their warnings.');
      }
  
      const warnings = JSON.parse(fs.readFileSync(warnFilePath, 'utf-8'));
      const userWarnings = warnings[user.id] || [];
  
      if (userWarnings.length === 0) {
        return message.reply(`No warnings found for ${user.tag}.`);
      }
  
      const warnList = userWarnings.map(
        (warning, index) =>
          `${index + 1}. Moderator: ${warning.moderator}, Reason: ${warning.reason}, Timestamp: ${warning.timestamp}`
      );
  
      message.channel.send(`Warnings for ${user.tag}:\n${warnList.join('\n')}`);
    }
  });
  // purge
  
  client.on('messageCreate', async message => {
    if (!message.guild) return;
    if (message.author.bot) return;
  
    const prefix = '?';
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();
  
    if (command === 'purge') {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('You must have administrator permissions to use this command.');
        }
  
        const amount = parseInt(args[0]);
  
        if (isNaN(amount) || amount <= 0 || amount > 100) {
            return message.reply('Please provide a valid number between 1 and 100 for the amount of messages to delete.');
        }
  
        try {
            const messages = await message.channel.messages.fetch({ limit: amount });
            await message.channel.bulkDelete(messages);
  
            const transcript = messages.reduce((acc, msg) => {
                return acc + `<p>${msg.author.tag} (${msg.author.id}) at ${msg.createdAt.toLocaleString()}:</p>\n<p>${msg.content}</p>\n\n`;
            }, '');
  
            const timestamp = Date.now();
            const fileName = `deleted-messages-${timestamp}.html`;
            const filePath = `./${fileName}`;
            fs.writeFileSync(filePath, generateStyledHTML(transcript));
  
            const attachment = new MessageAttachment(filePath);
            await message.channel.send({ files: [attachment] });
  
            setTimeout(() => {
                fs.unlinkSync(filePath); // Deletes the file after a short delay
            }, 5000); // Adjust the delay as needed (5000 milliseconds = 5 seconds)
        } catch (error) {
            console.error('Error deleting messages:', error);
            message.reply('Failed to delete messages.');
        }
    }
    if (command === 'checkpurge') {
        try {
            const log = await message.guild.fetchAuditLogs({ type: 'MESSAGE_BULK_DELETE', limit: 1 });
            const entry = log.entries.first();
  
            if (!entry) {
                return message.reply('No recent message purges found.');
            }
  
            const { executor, target, createdTimestamp } = entry;
  
            const embed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Message Purge Details')
                .addField('Executor', `${executor.tag} (${executor.id})`)
                .addField('Target', `${target.tag} (${target.id})`)
                .addField('Deleted At', new Date(createdTimestamp).toLocaleString());
  
            const timestamp = Date.now();
            const fileName = `purge-details-${timestamp}.txt`;
            fs.writeFileSync(`./${fileName}`, `Executor: ${executor.tag} (${executor.id})\nTarget: ${target.tag} (${target.id})\nDeleted At: ${new Date(createdTimestamp).toLocaleString()}`);
  
            const attachment = (`./${fileName}`, fileName);
            await message.channel.send({ files: [attachment] });
        } catch (error) {
          const fileName = `purge-details-${timestamp}.txt`
          const attachment = (`./${fileName}`, fileName);
        
            console.error('Error fetching purge details:', error);
            message.reply({files : [attachment] });
        }
    }
  });
  
  // Function to generate styled HTML
  function generateStyledHTML(content) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                background-color: #36393f;
                color: #dcddde;
                font-family: Arial, sans-serif;
                padding: 20px;
                margin: 0;
            }
            .message {
                background-color: #40444b;
                border-radius: 8px;
                padding: 10px;
                margin-bottom: 10px;
            }
            .author {
                font-weight: bold;
                color: #7289da;
            }
            p {
                margin-bottom: 5px;
                line-height: 1.5;
            }
            p:last-child {
                margin-bottom: 0;
            }
        </style>
    </head>
    <body>
        <div class="message">
            ${content}
        </div>
    </body>
    </html>`;
  }
  
  //econmey
  const economyFile = 'economy.json';
  
  let economyData = {};
  
  try {
    economyData = JSON.parse(fs.readFileSync(economyFile));
  } catch (err) {
    console.error('Error loading economy data:', err);
  }
  
  client.once('ready', () => {
    
  });
  
  client.on('messageCreate', async (message) => {
    if (!message.content.startsWith('?')) return;
  
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    if (command === 'balance') {
      const userId = message.author.id;
      const userBalance = economyData[userId] ? economyData[userId].balance : 0;
      message.reply(`Your balance is: 💵 ${userBalance}`);
    }
  
    if (command === 'work') {
      const userId = message.author.id;
      const earnings = Math.floor(Math.random() * 50) + 20;
      if (!economyData[userId]) {
        economyData[userId] = {
          balance: earnings,
          job: 'Unemployed',
        };
      } else {
        economyData[userId].balance += earnings;
      }
      message.reply(`You worked and earned 💵 ${earnings} coins!`);
      saveData();
    }
  
    if (command === 'setjob') {
      const userId = message.author.id;
      const newJob = args.join(' ');
      if (!economyData[userId]) {
        message.reply('You need to work first before getting a job!');
      } else {
        economyData[userId].job = newJob;
        message.reply(`Your job has been set to: ${newJob}`);
        saveData();
      }
    }
  
    if (command === 'daily') {
      const userId = message.author.id;
      const lastDaily = economyData[userId]?.lastDaily || 0;
      const now = Date.now();
      const cooldown = 24 * 60 * 60 * 1000; // 24 hours cooldown for daily command
  
      if (now - lastDaily < cooldown) {
        const timeLeft = (cooldown - (now - lastDaily)) / (1000 * 60 * 60);
        message.reply(`You've already claimed your daily reward! Come back in ${timeLeft.toFixed(1)} hours.`);
      } else {
        const dailyAmount = Math.floor(Math.random() * 100) + 50; // Daily reward between 50 and 150 coins
        economyData[userId].balance += dailyAmount;
        economyData[userId].lastDaily = now;
        message.reply(`You've claimed your daily reward! 💵 ${dailyAmount} coins have been added to your account.`);
        saveData();
      }
    }
  
    if (command === 'pay') {
      const userId = message.author.id;
      const recipient = message.mentions.users.first();
      const amount = parseInt(args[1]);
  
      if (!recipient || isNaN(amount) || amount <= 0) {
        message.reply('Invalid command usage! Use `?pay @user amount`.');
        return;
      }
  
      if (!economyData[userId] || economyData[userId].balance < amount) {
        message.reply('You don\'t have enough coins for this transaction.');
        return;
      }
  
      economyData[userId].balance -= amount;
      economyData[recipient.id] = (economyData[recipient.id] || { balance: 0 });
      economyData[recipient.id].balance += amount;
      message.reply(`You've paid 💵 ${amount} coins to ${recipient.username}.`);
      saveData();
    }
  
    if (command === 'leaderboard') {
      const sortedUsers = Object.entries(economyData).sort((a, b) => b[1].balance - a[1].balance);
      const topUsers = sortedUsers.slice(0, 10); // Display top 10 users
  
      const leaderboard = topUsers.map(([userId, userData], position) => {
        const user = client.users.cache.get(userId);
        return `${position + 1}. ${user ? user.username : 'Unknown'} - 💵 ${userData.balance}`;
      });
  
      message.reply(`**Economy Leaderboard**\n${leaderboard.join('\n')}`);
    }
  
    if (command === 'shop') {
      const shopItems = {
        laptop: { name: 'Laptop', price: 500 },
        phone: { name: 'Phone', price: 300 },
        headphones: { name: 'Headphones', price: 150 },
      };
  
      const shopList = Object.keys(shopItems)
        .map(item => `${item}: ${shopItems[item].name} - 💵 ${shopItems[item].price}`)
        .join('\n');
  
      message.reply(`**Welcome to the Shop!**\n${shopList}`);
    }
  
    if (command === 'buy') {
      const userId = message.author.id;
      const itemName = args[0];
      const shopItems = {
        laptop: { name: 'Laptop', price: 500 },
        phone: { name: 'Phone', price: 300 },
        headphones: { name: 'Headphones', price: 150 },
      };
  
      if (!shopItems[itemName]) {
        message.reply('That item does not exist in the shop!');
        return;
      }
  
      if (economyData[userId].balance < shopItems[itemName].price) {
        message.reply('You don\'t have enough coins to buy this item.');
        return
      }
  
      economyData[userId].balance -= shopItems[itemName].price;
      economyData[userId].inventory = economyData[userId].inventory || [];
      economyData[userId].inventory.push(shopItems[itemName].name);
  
      message.reply(`You've successfully bought ${shopItems[itemName].name} for 💵 ${shopItems[itemName].price}.`);
      saveData();
    }
  
    if (command === 'inventory') {
      const userId = message.author.id;
      const userInventory = economyData[userId]?.inventory || [];
  
      if (userInventory.length === 0) {
        message.reply('Your inventory is empty.');
      } else {
        const inventoryList = userInventory.map(item => `• ${item}`).join('\n');
        message.reply(`**Your Inventory**\n${inventoryList}`);
      }
    }
  
    // Other economy-related commands can be added here
  });
  
  function saveData() {
    fs.writeFile(economyFile, JSON.stringify(economyData, null, 2), (err) => {
      if (err) {
        console.error('Error saving economy data:', err);
      }
    });
  }
  
  // chatsave
  
  //tag
  const TAGS_FILE = 'tags.json';
  
  client.once('ready', () => {
    
  });
  
  client.on('messageCreate', async (message) => {
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
  
    const [command, ...args] = message.content.slice(prefix.length).trim().split(/ +/);
  
    if (command === 'addtag') {
      if (!message.member.permissions.has('MANAGE_MESSAGES')) {
        return message.reply('You do not have permission to use this command.');
      }
  
      const [tagName, ...tagContent] = args;
  
      if (!tagName || !tagContent.length) {
        return message.reply('Please provide a tag name and content.');
      }
  
      const tag = tagContent.join(' ');
  
      try {
        const tags = await getTags();
        tags[tagName] = tag;
        await saveTags(tags);
        message.reply(`Tag '${tagName}' has been added.`);
      } catch (error) {
        console.error('Error adding tag:', error);
        message.reply('There was an error adding the tag.');
      }
    }
  
    if (command === 'tag') {
      const tagName = args[0];
  
      if (!tagName) {
        return message.reply('Please provide a tag name.');
      }
  
      try {
        const tags = await getTags();
        const tagContent = tags[tagName];
        if (tagContent) {
          message.channel.send(tagContent);
        } else {
          message.reply(`Tag '${tagName}' does not exist.`);
        }
      } catch (error) {
        console.error('Error fetching tag:', error);
        message.reply('There was an error fetching the tag.');
      }
    }
  });
  
  async function getTags() {
    try {
      const data = await fs.readFile(TAGS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return {};
      }
      throw error;
    }
  }
  
  async function saveTags(tags) {
    await fs.writeFile(TAGS_FILE, JSON.stringify(tags, null, 2));
  }
  
  // end tags
  
  client.on('messageCreate', async message => {
    if (!message.guild) return;
    if (message.author.bot) return;
  
    if (message.content === '?chatsave') {
      if (!message.member.permissions.has('ADMINISTRATOR')) {
        return message.reply('You need to have administrator permissions to use this command.');
      }
  
      try {
        const messages = await message.channel.messages.fetch({ limit: 100 });
        const transcript = generateStyledHTML(messages);
  
        const timestamp = Date.now();
        const fileName = `chat-transcript-${timestamp}.html`;
        const filePath = `./${fileName}`;
        fs.writeFileSync(filePath, transcript);
  
        const attachment = (filePath, fileName);
        await message.channel.send({ files: [attachment] });
  
        setTimeout(() => {
          fs.unlinkSync(filePath); // Deletes the file after a short delay
        }, 5000); // Adjust the delay as needed (5000 milliseconds = 5 seconds)
      } catch (error) {
        console.error('Error saving chat transcript:', error);
        message.reply('Saved!');
      }
    }
  });
  
  
  //styled HTML
  function generateStyledHTML(messages) {
    const htmlHeader = `
        <html>
            <head>
                <style>
                body {
                  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                  background-color: #36393f;
                  color: #dcddde;
                  margin: 0;
                  padding: 20px;
                }
                
                .message {
                  background-color: #40444b;
                  border-radius: 8px;
                  padding: 10px;
                  margin: 10px 0;
                  max-width: 70%;
                }
                
                .author {
                  font-weight: bold;
                  color: #7289da;
                }
                
                .timestamp {
                  color: #72767d;
                  font-size: 0.8em;
                }
                
                .content {
                  white-space: pre-wrap;
                  color: #dcddde;
                }
                
                <h1>Chat Transcript</h1>
    `;
    const htmlFooter = `
            </body>
        </html>
    `;
  
    const messageContent = messages.reduce((acc, msg) => {
        return acc + `
            <div class="message">
                <span class="author">${msg.author.tag}</span>
                <span class="timestamp">(${msg.createdAt.toLocaleString()})</span>
                <div class="content">${msg.content}</div>
            </div>
        `;
    }, '');
  
    return htmlHeader + messageContent + htmlFooter;
  }
  
  //summarize
  client.on('message', async (message) => {
    if (message.author.bot) return;
  
    // Handle ?create_report command
    if (message.content.startsWith('?create_report')) {
      const channelId = message.content.substring(15).replace('<#', '').replace('>', '');
      const channel = message.guild.channels.cache.get(channelId);
  
      if (!channel) {
        message.channel.send('Invalid channel ID.');
        return;
      }
  
      const reportData = generateReportData(channel);
      const htmlReport = generateHTMLReport(reportData);
  
      // Send HTML report as a temporary message
      const tempMessage = await message.channel.send({
        files: [{ attachment: Buffer.from(htmlReport), name: 'report.html' }]
      });
  
      // Delete temporary message after 5 minutes
      setTimeout(() => {
        tempMessage.delete();
      }, 300000);
  
      // Store report data and timestamp
      reports.push({
        channelId: channel.id,
        reportData: reportData,
        timestamp: new Date().toISOString()
      });
    }
  });
  
  // Create a Map to store the server prefixes
  const prefixes = new Map();
  
  // Function to retrieve the server prefix
  const getPrefix = (guildId) => {
    return prefixes.get(guildId) || '+';
  };
  
  // Load the prefix commands from the "prefixcommands" folder
  client.prefixcommands = new Collection();
  const prefixCommandFiles = fs.readdirSync('./prefixcommands').filter(file => file.endsWith('.js'));
  for (const file of prefixCommandFiles) {
    const command = require(`./prefixcommands/${file}`);
    client.prefixcommands.set(command.nombre, command);
  }
  
  // Rest of your code...
  
  client.on('messageCreate', async (message) => {
    // Ignore messages from bots and non-text channels
    if (message.author.bot || !message.guild) return;
  
    // Retrieve the server prefix
    const prefix = getPrefix(message.guild.id);
  
    // Check if the message starts with the prefix
    if (!message.content.startsWith(prefix)) return;
  
    // Extract the command and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
  
    // Check if the command exists in the prefix commands collection
    if (client.prefixcommands.has(commandName)) {
      const command = client.prefixcommands.get(commandName);
      try {
        // Execute the command
        command.run(client, message, args);
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while executing the command.');
      }
    }
  });
  // Function to generate HTML transcript of deleted messages
  function generateHTMLTranscript(deletedMessages) {
    let html = '<html><head><title>Deleted Messages Transcript</title></head><body>';
  
    for (const message of deletedMessages) {
      html += `<p>${message.author.tag}: ${message.content}</p>`;
    }
  
    html += '</body></html>';
    return html;
  }
  
  // user stats /////// logs!!!
  const logFile = 'role_changes.json'; // JSON file to store role change logs
  const htmlLogFile = 'role_changes.html'; // HTML file to store role change logs
  
  client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    if (command === 'addrole') {
        const targetUser = message.mentions.members.first();
        const mentionedRole = message.mentions.roles.first();
  
        if (!targetUser || !mentionedRole) {
            return message.channel.send('Please mention a user and provide a valid role.');
        }
  
        try {
            await targetUser.roles.add(mentionedRole);
            logRoleChange(message.author.id, targetUser.id, mentionedRole.name, 'add');
            const htmlContent = generateRoleChangeReportHTML(getRoleChangeLog());
            fs.writeFileSync(htmlLogFile, htmlContent);
            const attachment = new MessageAttachment(htmlLogFile);
            message.channel.send(`Role ${mentionedRole.name} added to ${targetUser}`, { files: [attachment] });
        } catch (error) {
            console.error('Error adding role:', error);
            message.channel.send('Error adding role.');
        }
      } else if (command === 'removerole') {
          const targetUser = message.mentions.members.first();
          const mentionedRole = message.mentions.roles.first();
  
          if (!targetUser || !mentionedRole) {
              return message.channel.send('Please mention a user and provide a valid role.');
          }
  
          try {
              await targetUser.roles.remove(mentionedRole);
              logRoleChange(message.author.id, targetUser.id, mentionedRole.name, 'remove');
              message.channel.send(`Role ${mentionedRole.name} removed from ${targetUser}`);
          } catch (error) {
              console.error('Error removing role:', error);
              message.channel.send('Error removing role.');
          }
      } else if (command === 'rolereport') {
          const logData = getRoleChangeLog();
          if (!logData || logData.length === 0) {
              return message.channel.send('No recent role changes.');
          }
  
          const htmlContent = generateRoleChangeReportHTML(logData);
          message.channel.send({ files: [htmllogData] });
      }
  });
  
  function logRoleChange(authorId, userId, roleName, action) {
    const timestamp = new Date().toISOString();
    let logData = [];
  
    if (fs.existsSync(logFile)) {
        logData = JSON.parse(fs.readFileSync(logFile));
    }
  
    // Ensure logData is an array
    if (!Array.isArray(logData)) {
        logData = [];
    }
  
    logData.push({ authorId, userId, roleName, action, timestamp });
    fs.writeFileSync(logFile, JSON.stringify(logData, null, 2));
  
    const htmlLogData = getRoleChangeLog();
    const htmlContent = generateRoleChangeReportHTML(htmlLogData);
    fs.writeFileSync(htmlLogFile, htmlContent);
  }
  
  function logRoleChange(authorId, userId, roleName, action) {
    const timestamp = new Date().toISOString();
    let logData = [];
  
    if (fs.existsSync(logFile)) {
        logData = JSON.parse(fs.readFileSync(logFile));
    }
  
    if (!Array.isArray(logData)) {
        logData = [];
    }
  
    logData.push({ authorId, userId, roleName, action, timestamp });
    fs.writeFileSync(logFile, JSON.stringify(logData, null, 2));
  }
  
  function getRoleChangeLog() {
      try {
          if (fs.existsSync(logFile)) {
              return JSON.parse(fs.readFileSync(logFile));
          }
          return [];
      } catch (error) {
          console.error('Error reading role change log:', error);
          return [];
      }
  }
  
  function generateRoleChangeReportHTML(logData) {
      let htmlContent = `<h2>Recent Role Changes Report</h2>`;
      htmlContent += `<table border="1">
                          <tr>
                              <th>Timestamp</th>
                              <th>User</th>
                              <th>Role</th>
                              <th>Action</th>
                          </tr>`;
  
      logData.forEach(entry => {
          const action = entry.action === 'add' ? 'Added' : 'Removed';
          htmlContent += `<tr>
                              <td>${entry.timestamp}</td>
                              <td>${entry.userId}</td>
                              <td>${entry.roleName}</td>
                              <td>${action}</td>
                          </tr>`;
      });
  
      htmlContent += `</table>`;
      return htmlContent;
  }
  // counter
  
  client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    if (command === 'counter') {
      const button = new MessageButton()
        .setCustomId('increment_button')
        .setLabel('Increment')
        .setStyle('PRIMARY');
  
      const row = new MessageActionRow().addComponents(button);
  
      const counterMessage = await message.reply({ content: 'Counter: 0', components: [row] });
  
      const filter = i => i.customId === 'increment_button' && i.user.id === message.author.id;
      const collector = counterMessage.createMessageComponentCollector({ filter, time: 15000 });
  
      let count = 0;
  
      collector.on('collect', async i => {
        count++;
        await i.update({ content: `Counter: ${count}` });
      });
  
      collector.on('end', () => {
        counterMessage.edit({ components: [] }).catch(console.error);
      });
    }
  });
  //
  client.on('messageCreate', message => {
    if (message.content === '!sendfile') {
        // Replace 'path/to/your/file' with the actual file path
        const attachment = ('./deleted-messages-1701695055637.html');
  
        // Send the file as an attachment
        message.channel.send({ files: ['./deleted-messages-1701695055637.html'] })
            .then(() => console.log('File sent'))
            .catch(error => console.error('Error sending file:', error));
    }
  });
  //example embed
  client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    if (command === 'say') {
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Embedded Message')
        .setDescription('This is an embedded message.')
  
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('send_embed')
            .setLabel('Send Embed')
            .setStyle(1)
        );
  
      await message.channel.send({ content: 'Click the button to send an embed:', embeds: [embed], components: [row] });
    }
  });
  
  client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
  
    if (interaction.customId === 'send_embed') {
        await interaction.update({ content: 'Embed sent!', components: [] });
  
        const embedToSend = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Embedded Message')
            .setDescription('This is an embedded message.');
  
        await interaction.channel.send({ embeds: [embedToSend] });
    }
  });
  // Embed system
  
  client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    if (command === 'formcommand') {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Form Command')
            .setDescription('Click the button below to start the form.');
  
        const row = new ActionRowBuilder()
            .addComponents(
                new EmbedBuilder()
                    .setCustomId('start_form')
                    .setLabel('Start Form')
                    .setStyle('PRIMARY')
            );
  
        await message.channel.send({ content: 'Please start the form:', embeds: [embed], components: [row] });
    }
  });
  
  client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
  
    const { customId } = interaction;
    const formQuestions = [
        'Enter your name:',
        'Enter your age:',
        'Enter your location:'
    ];
  
    if (customId === 'start_form') {
        let formContent = '';
        let i = 0;
  
        await interaction.reply(formQuestions[i++]);
  
        const messageCollector = interaction.channel.createMessageCollector({
            filter: m => m.author.id === interaction.user.id,
            time: 60000
        });
  
        messageCollector.on('collect', async msg => {
            formContent += `**${formQuestions[i - 1]}** ${msg.content}\n`;
            if (i < formQuestions.length) {
                await interaction.followUp(formQuestions[i++]);
            } else {
                messageCollector.stop();
                interaction.followUp(`Form submitted:\n${formContent}`);
            }
        });
  
        messageCollector.on('end', collected => {
            if (collected.size === 0) {
                interaction.followUp('Form session timed out.');
            }
        });
    }
  })
  //
  // If you want to enable the auto mod command (bad words) uncomment this section (You can config the words and message in config.json know as badwords)
  /* client.on('messageCreate', async (message) => {
    const lowerCaseContent = message.content.toLowerCase(); // Lowercase the message content for better matching
  
    if (config.badWords.some(word => lowerCaseContent.includes(word))) {
      try {
        const warningMessage = await message.reply(config.warningMessage);
        setTimeout(() => {
          warningMessage.delete().catch(console.error); // Delete the warning message after a short delay
        }, 5000); // 5000 milliseconds (5 seconds) - 1000ms = 1 seccond
  
        await message.delete(); // Delete the message containing the swear word
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }); */
  //---pend---
  
  
  //games 1v1
  const levelNames2 = ["Unranked", "Bronze", "Silver", "Gold", "Emerald", "Diamond", "Master", "Elite"];
  const discordTranscripts = require('discord-html-transcripts');
  const duelsSchema = require('./Schemas/1v1Schema');
  const duelsLevelSchema = require("./Schemas/1v1Levels");
  const chatSchema = require('./Schemas/chat');
   
  client.on(Events.InteractionCreate, async i => {
    if (i.isButton()) {
      if (i.customId === 'queue') {
        
        const duelsData = await duelsSchema.findOne({ Guild: i.guild.id })
   
        if (!duelsData) {
          i.reply({ content: "The 1v1 system is currently disabled.", ephemeral: true})
          return;
        }
        
        const category = i.guild.channels.cache.get(duelsData.Category)    
        const logChannel = i.guild.channels.cache.get(duelsData.Logs)
        const transcriptsChannel = i.guild.channels.cache.get(duelsData.Transcript)
   
        const member = i.member
    
        if (!member) {
            i.reply({ content: "This command can only be used by guild members.", ephemeral: true });
            return;
        }
   
        const username = member.user.username.toLowerCase();
        const channelName = username.replace(/ /g, "-");
        const posChannel = await i.guild.channels.cache.find(c => c.name.includes(username) || c.name.includes(channelName));
   
        const openMatchmakingEmbed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({ 
            name: "Match Open 🎮",
            iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
        })
        .setDescription(`You are already in a match there for you cannot queue again! Wait until your match has been played out!`)
        .setTimestamp()
        .setFooter({ text: `Radiant Utilities | Matchmaking System`})
   
        const dmEmbed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({ 
            name: "Matchmaking Queue 🎮",
            iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
        })
        .setDescription(`You were added to the matchmaking queue. You can leave this queue at any time by clicking the 'unqueue' button on the queue message.`)
        .setTimestamp()
        .setFooter({ text: `Radiant Utilities | Matchmaking System`})
   
   
        if (posChannel) return await i.reply({ embeds: [openMatchmakingEmbed], ephemeral: true})
   
        const Data2 = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: member.id });
            
        if (!Data2) {
            duelsLevelSchema.create({
                Guild: i.guild.id,
                User: member.id,
                Rank: 0,
                Level: 0
            })
        }
   
        const Data = await duelsSchema.findOne({ Guild: i.guild.id, MatchID: 0 });
        if (!Data) {
            duelsSchema.create({
                Guild: i.guild.id, 
                MatchID: 0,
                MemberOneID: member.id,
                UserID: 0
            })
   
            i.reply({ content: ":white_check_mark:  You were added to the queue!", ephemeral: true })
            member.send({ embeds: [dmEmbed] }).catch(err => {
                return;
            })
   
            const queueEmbed = new EmbedBuilder()
            .setColor("Aqua")
            .setAuthor({ 
                name: "Entered Queue",
                iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
            })
            .setDescription(`${member} has enterd the queue`)
            .setTimestamp()
            .setFooter({ text: "Radiant Utilities | Matchmaking System"})
            logChannel.send({ embeds: [queueEmbed] })
   
        } else if (Data.MemberOneID != member.id) {
            const memberTwo = member
            const guild = i.guild
            if (!guild) return console.log(`Couldn't find guild with ID ${guild}`);
            const memberOne = guild.members.cache.get(Data.MemberOneID);
            if (!memberOne) return i.reply({ content: 'The 1v1 queuing system is down for maintenance.' });
            const channel = await i.guild.channels.create({
                name: `1v1 ${memberOne.user.username} vs ${memberTwo.user.username}`,
                type: ChannelType.GuildText,
                parent: category
            }).catch(err => {
                i.reply({ content: 'The 1v1 queuing system is down for maintenance.' })
            })                   
   
            await duelsSchema.deleteMany({
                Guild: i.guild.id,
                MemberOneID: memberOne.id
            });
   
            const queueEmbed = new EmbedBuilder()
            .setColor("Blue")
            .setAuthor({ 
                name: "Entered Queue",
                iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
            })
            .setDescription(`${memberTwo} has enterd the queue`)
            .setTimestamp()
            .setFooter({ text: "Radiant Utilities | Matchmaking System"})
   
            const guildMemberOne = await channel.guild.members.fetch(memberOne.id).catch(() => null);
            if (!guildMemberOne) {
                return;
            } else {
                channel.permissionOverwrites.create(memberOne, { ViewChannel: true, SendMessages: true });
            }
   
            const guildMemberTwo = await channel.guild.members.fetch(memberTwo.id).catch(() => null);
            if (!guildMemberTwo) {
                return;
            } else {
                channel.permissionOverwrites.create(memberTwo, { ViewChannel: true, SendMessages: true });
            }
   
            i.reply({ content: `:white_check_mark:  You were added to the queue! You can see it here: ${channel}`, ephemeral: true })
            memberTwo.send({ embeds: [dmEmbed] }).catch(err => {
                return;
            })
   
            memberOne.send(`Hey ${memberOne}, your 1v1 has started, you are going against ${memberTwo}, you can view it here: ${channel}. Good luck!`).catch(err => {
                return;
            });
   
            memberTwo.send(`Hey ${memberTwo}, your 1v1 has started, you are going against ${memberOne}, you can view it here: ${channel}. Good luck!`).catch(err => {
                return;
            });
   
            if (logChannel) {
              await logChannel.send({ embeds: [queueEmbed] });
            } else {
              return;
            }
   
            const logEmbed = new EmbedBuilder()
            .setColor('Green')
            .setAuthor({ 
                name: "New Match Started",
                iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
            })
            .setDescription(`Match started between ${memberOne} and ${memberTwo}`)
            .setTimestamp()
            .setFooter({ text: "Radiant Utilities | Matchmaking System"})
   
            if (logChannel) {
            await logChannel.send({ embeds: [logEmbed] })
          } else {
            return;
          }
   
            const levelData = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberOne.id});
            const levelData2 = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberTwo.id });
   
            const embeder2 = new EmbedBuilder()
            .setColor("DarkBlue")
            .setAuthor({ 
                name: "Matchmaking",
                iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
            })
            .setDescription(`**A Radiant Utilities Valorant match has been found for ${memberOne} and ${memberTwo}**\n\n__**Team 1**__\nDiscord: ${memberOne}\nDiscord ID: ${memberOne.id}\nXP: ${levelData ? levelData.Rank : 'Unknown'}\n\n__**Team 2**__\nDiscord: ${memberTwo}\nDiscord ID: ${memberTwo.id}\nXP: ${levelData2 ? levelData2.Rank : 'Unknown'}\n\n__**How to play**__\nYou must tell your opponent your __Valorant__ username\nYou must play a __deathmatch in Valorant__\nThe winner is decided by __best of 5__\n\n__**Rules**__\nYou're NOT allowed to have friends to spectate.\n__Be respectful to your opponent!__`);
   
            const embeder = new EmbedBuilder()
            .setColor("DarkBlue")       
            .setDescription(`**When the game is over, use the reactions below to react with the __winner__**\n\n${memberOne.user.tag} **won?** 1️⃣\n\n${memberTwo.user.tag} **won?** 2️⃣\n\n**Need assistance?** React with ❓`)
            .setFooter({ text: "Radiant Utilities | Matchmaking System"})
            .setTimestamp();
   
            const message = await channel.send({ embeds: [embeder2, embeder], content: `${memberOne} ${memberTwo}` });
            await message.react('1️⃣');
            await message.react('2️⃣'); 
            await message.react('❓');
   
            let resolved = false;
            let roleHasPermissions = false;
            
            const filter = (reaction, user) => reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' || reaction.emoji.name === '❓' && !user.bot;
   
            const collector = message.createReactionCollector({ filter, max: 100 });
            
            collector.on('collect', async (collected, user) => {
            if (collected.count === 3) {
                
                if (collected.emoji.name === '1️⃣') {
   
                    const attachment = await discordTranscripts.createTranscript(channel);
   
                    channel.delete();
   
                    //XP system
   
                    duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberOne.id }, async (err, data) => {
   
                        if (err) throw err;
   
                        if (!data) {
                            duelsLevelSchema.create({
                                Guild: i.guild.id, 
                                User: memberOne.id,
                                Rank: 100,
                                Level: 0
                            })
                        }
                    })
   
                    const give = Math.floor(Math.random() * 81) + 60;
   
                    const levelData = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberOne.id});
   
                    if (!levelData) return;
   
                    const levelThresholds = [0, 300, 750, 1250, 1750, 2500, 3500, 5000, 1000000000000000]; // XP thresholds for each level
                    const currentLevel = levelData.Level;
   
                    const nextLevel = currentLevel + 1;
                    const nextLevelThreshold = levelThresholds[nextLevel];
   
                    const requiredXP = nextLevelThreshold ? nextLevelThreshold : 0;
   
                    if (levelData.Rank + give >= requiredXP) {
   
                        levelData.Rank += give;
                        levelData.Level += 1;
                        await levelData.save();
   
                    } else {
                        levelData.Rank += give;
                        levelData.save()
                    }
   
                    //XP system take
                    duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberTwo.id }, async (err, data) => {
                        if (err) throw err;
                    
                        if (!data) {
                            duelsLevelSchema.create({
                                Guild: i.guild.id, 
                                Guild: guildId,
                                User: memberOne.id
                            })
                        }
                    });
                    
                    let take = Math.floor(Math.random() * 30) + 50;
                    
                    const levelData1 = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberTwo.id });
                    
                    if (!levelData1) return;
                    
                    const levelThresholds1 = [0, 300, 750, 1250, 1750, 2500, 3500, 5000, 1000000000000000]; // XP thresholds for each level
                    const currentLevel1 = levelData1.Level;
                    
                    if (levelData1.Rank - take <= 0) {
                        take = levelData1.Rank;
                        levelData1.Rank = 0;
                        levelData1.Level = Math.max(0, currentLevel1 - 1);
                        levelData1.save();
                    } else {
                        const prevLevelThreshold = levelThresholds1[currentLevel1] || 0;
                        const requiredXP = prevLevelThreshold;
                    
                        if (levelData1.Rank - take < requiredXP && currentLevel1 > 0) {
                            levelData1.Rank -= take;
                            levelData1.Level = Math.max(0, currentLevel1 - 1);
                            await levelData1.save();
                        } else {
                            levelData1.Rank -= take;                            
                            await levelData1.save();
                        }
                    }
   
                    const memberOneWinner = new EmbedBuilder()
                    .setColor('Gold')
                    .setAuthor({ 
                        name: "Match Ended",
                        iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
                    })
                    .setDescription(`${memberOne} has won the match!`)
                    .addFields({ name: `${memberOne.user.tag}`, value: `+${give} (${levelData.Rank})`, inline: true})
                    .addFields({ name: `${memberTwo.user.tag}`, value: `-${take} (${levelData1.Rank})`, inline: true})
                    .setTimestamp()
                    .setFooter({ text: 'Radiant Utilities | Matchmaking System'})
   
                    const memberOneWinnerTranscripts = new EmbedBuilder()
                    .setColor('Gold')
                    .setAuthor({ 
                        name: "Match Ended",
                        iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
                    })
                    .setDescription(`${memberOne}'s and ${memberTwo}'s match history.`)
                    .addFields({ name: `${memberOne.user.tag}`, value: `+${give} (${levelData.Rank})`, inline: true})
                    .addFields({ name: `${memberTwo.user.tag}`, value: `-${take} (${levelData1.Rank})`, inline: true})
                    .setTimestamp()
                    .setFooter({ text: 'Radiant Utilities | Matchmaking System'})
   
                    const levelObj = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberOne.id });
   
                    const levelName = levelNames2[levelObj.Level];                            
   
                    const levelObj2 = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberTwo.id });
                    
                    const levelName2 = levelNames2[levelObj2.Level]; 
   
                    memberOne.send({ content: `You won the match and earned +**${give}** XP!\n\nCurrent XP: **${levelData.Rank}**\n\nCurrent rank: **${levelName}**`}).catch(err => {
                        return;
                    })
   
                    memberTwo.send({ content: `You unfortunately lost the match, queue again to gain your XP back!\n\nXP lost: -**${take}**\n\nCurrent XP: **${levelData1.Rank}**\n\nCurrent rank: **${levelName2}**`}).catch(err => {
                        return;
                    })
                    
                    if (transcriptsChannel) {
                      transcriptsChannel.send({
                          files: [attachment],
                          embeds: [memberOneWinnerTranscripts]
                      });
                    } else {
                      return;
                    }
   
                    if (logChannel) {
                      logChannel.send({ embeds: [memberOneWinner] });
                    } else {
                      return;
                    }
                } else if (collected.emoji.name === '2️⃣') {
   
                    const attachment = await discordTranscripts.createTranscript(channel);
   
                    channel.delete();
   
                    // XP system
                    duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberTwo.id }, async (err, data) => {
                      if (err) throw err;
  
                      if (!data) {
                        await duelsLevelSchema.create({
                          Guild: i.guild.id,
                          User: memberTwo.id,
                          Rank: 100,
                          Level: 0
                        });
                      }
                    });
  
                    const give = Math.floor(Math.random() * 61) + 80;
  
                    const levelData = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberTwo.id });
  
                    if (!levelData) return;
  
                    const levelThresholds = [0, 300, 750, 1250, 1750, 2500, 3500, 5000, 1000000000000000]; // XP thresholds for each level
                    const currentLevel = levelData.Level;
  
                    const nextLevel = currentLevel + 1;
                    const nextLevelThreshold = levelThresholds[nextLevel];
  
                    const requiredXP = nextLevelThreshold || 0;
  
                    if (levelData.Rank + give >= requiredXP) {
                      levelData.Rank += give;
                      levelData.Level += 1;
                      await levelData.save();
                    } else {
                      levelData.Rank += give;
                      levelData.save();
                    }
   
                    //XP system take
                    duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberOne.id }, async (err, data) => {
                        if (err) throw err;
                    
                        if (!data) {
                            duelsLevelSchema.create({
                                Guild: i.guild.id, 
                                User: memberOne.id
                            })
                        }
                    });
                    
                    let take = Math.floor(Math.random() * 30) + 50;
                    
                    const levelData1 = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberOne.id });
                    
                    if (!levelData1) return;
                    
                    const levelThresholds1 = [0, 300, 750, 1250, 1750, 2500, 3500, 5000, 1000000000000000]; // XP thresholds for each level
                    const currentLevel1 = levelData1.Level;
                    
                    if (levelData1.Rank - take <= 0) {
                        take = levelData1.Rank;
                        levelData1.Rank = 0;                                
                        levelData1.Level = Math.max(0, currentLevel1 - 1);
                        levelData1.save();
                    } else {
                        const prevLevelThreshold = levelThresholds1[currentLevel1] || 0;
                        const requiredXP = prevLevelThreshold;
                    
                        if (levelData1.Rank - take < requiredXP && currentLevel1 > 0) {
                            levelData1.Rank -= take;
                            levelData1.Level = Math.max(0, currentLevel1 - 1);
                            await levelData1.save();
                        } else {
                            levelData1.Rank -= take;
                            await levelData1.save();
                        }
                    }
                    //XP system end take
   
                    const memberTwoWinner = new EmbedBuilder()
                    .setColor('Gold')
                    .setAuthor({ 
                        name: "Match Ended",
                        iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
                    })
                    .setDescription(`${memberTwo} has won the match!`)
                    .addFields({ name: `${memberTwo.user.tag}`, value: `+${give} (${levelData.Rank})`, inline: true})
                    .addFields({ name: `${memberOne.user.tag}`, value: `-${take} (${levelData1.Rank})`, inline: true})
                    .setTimestamp()
                    .setFooter({ text: 'Radiant Utilities | Matchmaking System'})
   
                    const memberTwoWinnerTranscripts = new EmbedBuilder()
                    .setColor('Gold')
                    .setAuthor({ 
                        name: "Match Ended",
                        iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
                    })
                    .setDescription(`${memberTwo}'s and ${memberOne}'s match history.`)
                    .setTimestamp()
                    .setFooter({ text: 'Radiant Utilities | Matchmaking System'})
   
                    const levelObj = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberOne.id });
   
                    const levelName = levelNames2[levelObj.Level];                            
   
                    const levelObj2 = await duelsLevelSchema.findOne({ Guild: i.guild.id, User: memberTwo.id });
                    
                    const levelName2 = levelNames2[levelObj2.Level]; 
   
                    memberTwo.send({ content: `You won the match and earned +**${give}** XP!\n\nCurrent XP: **${levelData.Rank}**\n\nCurrent rank: **${levelName2}**`}).catch(err => {
                        return;
                    })
   
                    memberOne.send({ content: `You unfortunately lost the match, queue again to gain your XP back!\n\nXP lost: -**${take}**\n\nCurrent XP: **${levelData1.Rank}**\n\nCurrent rank: **${levelName}**`}).catch(err => {
                        return;
                    })
                    
                    if (transcriptsChannel) {
                      transcriptsChannel.send({
                          files: [attachment],
                          embeds: [memberTwoWinnerTranscripts]
                      });
                    } else {
                      return;
                    }
   
                    if (logChannel) {
                      logChannel.send({ embeds: [memberTwoWinner] });
                    } else {
                      return;
                    }
                } 
            }
   
            if (collected.emoji.name === '❓' && !resolved && !roleHasPermissions) {
                const duelsData = await duelsSchema.findOne({ Guild: i.guild.id })
   
                const role = i.guild.roles.cache.get(duelsData.Role)
                channel.permissionOverwrites.create(role, { ViewChannel: true, SendMessages: true });
                roleHasPermissions = true;
                resolved = true;
   
                const assistanceEmbed = new EmbedBuilder()
                .setColor('Orange')
                .setAuthor({ 
                    name: "Staff Assistance",
                    iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
                })
                .setDescription(`${user} has called for staff assistance.`)
                .setTimestamp()
                .setFooter({ text: 'Radiant Utilities | Matchmaking System'})
            
                channel.send(`${role} - ${user.tag} has called for staff assistance.`).catch(collected => {
                    channel.send('The voting system is down for maintenance.');
                });
   
                logChannel.send({ embeds: [assistanceEmbed] })
                await chatSchema.create({ 
                    Guild: i.guild.id, 
                    MemberID: user.id,
                    ChannelId: channel.id,
                    AskedForSuport: true,
                })
   
            } else if (collected.emoji.name === '❓' && resolved) {
                const member = await collected.message.guild.members.fetch(user);
                if (member === memberOne || member === memberTwo) {
                    return;
                }
                if (member.roles.cache.has(role.id)) {
   
                    const resolvedEmbed = new EmbedBuilder()
                    .setColor('Purple')
                    .setAuthor({ 
                        name: "Match Resolved",
                        iconURL: client.user.avatarURL({ dynamic: true, size: 1024 }) 
                    })
                    .setDescription(`${member} has resolved the match.`)
                    .setTimestamp()
                    .setFooter({ text: 'Radiant Utilities | Matchmaking System'})
   
                    channel.send(`${member.user.tag} has resolved the match. React to the ❓ if you need any help.`);
                    channel.permissionOverwrites.create(role, { ViewChannel: false, SendMessages: false });
   
                    if (logChannel) {
                      logChannel.send({ embeds: [resolvedEmbed] });
                    } else {
                      return;
                    }
   
                    resolved = false;
                    roleHasPermissions = false;
                }
            }
            
            });                                                             
   
        } else if (Data.MemberOneID === member.id) {
            i.reply({ content: "You have already entered a queue!", ephemeral: true})
        }  
      }
    }
  })
   
  client.on(Events.InteractionCreate, async i => {
    if (i.isButton()) {
        if (i.customId === 'unqueue') {
   
            const duelsData = await duelsSchema.findOne({ Guild: i.guild.id });
   
            if (!duelsData) {
                i.reply({ content: "The 1v1 system is currently disabled.", ephemeral: true });
                return;
            }
   
            const member = i.member;
   
            if (!member) {
                i.reply({ content: "This command can only be used by guild members.", ephemeral: true });
                return;
            }
   
            const username = member.user.username.toLowerCase();
            const channelName = username.replace(/ /g, "-");
            const posChannel = await i.guild.channels.cache.find(c => c.name.includes(username) || c.name.includes(channelName));
   
            const unqueueEmbed = new EmbedBuilder()
                .setColor('Red')
                .setAuthor({
                    name: "Left Queue",
                    iconURL: client.user.avatarURL({ dynamic: true, size: 1024 })
                })
                .setDescription(`${member} has left the queue`)
                .setTimestamp()
                .setFooter({ text: "Radiant Utilities | Matchmaking System" });
   
            const openMatchmakingEmbed = new EmbedBuilder()
                .setColor("Green")
                .setAuthor({
                    name: "Match Open 🎮",
                    iconURL: client.user.avatarURL({ dynamic: true, size: 1024 })
                })
                .setDescription(`You are already in a match there for you cannot unqueue!`)
                .setTimestamp()
                .setFooter({ text: `Radiant Utilities | Matchmaking System` });
   
            if (posChannel) return await i.reply({ embeds: [openMatchmakingEmbed], ephemeral: true });
   
            const inQueueEmbed = new EmbedBuilder()
                .setColor("Green")
                .setAuthor({
                    name: "Matchmaking Queue 🎮",
                    iconURL: client.user.avatarURL({ dynamic: true, size: 1024 })
                })
                .setDescription(`You have not entered a queue yet and can there for not unqueue.`)
                .setTimestamp()
                .setFooter({ text: `Radiant Utilities | Matchmaking System` });
   
            const dmUnqueue = new EmbedBuilder()
                .setColor("Red")
                .setAuthor({
                    name: "Left Queue",
                    iconURL: client.user.avatarURL({ dynamic: true, size: 1024 })
                })
                .setDescription('You have successfully left the queue!');
   
            const data = await duelsSchema.findOne({ Guild: i.guild.id, MemberOneID: member.id });
   
            if (data) {
                duelsSchema.deleteMany({ MemberOneID: member.id }, async (err, data) => {
                    i.reply({ content: ":white_check_mark: You were removed from the queue!", ephemeral: true });
                    member.send({ embeds: [dmUnqueue] }).catch(err => {
                        return;
                    });
   
                    const logChannel = i.guild.channels.cache.get(duelsData.Logs);
   
                    if (!logChannel) {
                      return;
                    } else {
                        logChannel.send({ embeds: [unqueueEmbed] });
                    }
                });
            } else {
                await i.reply({ embeds: [inQueueEmbed], ephemeral: true });
            }
   
        }
    }
  });
  ///////////////////////////////////////////end 1v1/////////////////////////////////////
  
  
  
  ///logs roles//
  const inviteSchema = require('./Schemas/inviteSchema');
  const wait = require("timers/promises").setTimeout;
  
  const invites = new Collection();
  
  client.on('ready', async () => {
    await wait(2000);
  
    client.guilds.cache.forEach(async (guild) => {
      const clientMember = guild.members.cache.get(client.user.id);
  
      if (!clientMember.permissions.has(PermissionsBitField.Flags.ManageGuild)) return;
  
      const firstInvites = await guild.invites.fetch().catch(err => { console.log(err) });
  
      if (firstInvites) {
        invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
      }
    });
  });
  
  client.on(Events.GuildMemberAdd, async member => {
    const Data = await inviteSchema.findOne({ Guild: member.guild.id });
    if (!Data) return;
  
    const channelID = Data.Channel;
    const channel = await member.guild.channels.cache.get(channelID);
  
    const newInvites = await member.guild.invites.fetch();
    const oldInvites = invites.get(member.guild.id);
  
    const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
  
    if (!invite) {
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('New Member')
        .setDescription(`${member.toString()} joined the server using an unknown invite.  This could possibly be a vanity invite link if your server has one.`)
        .setTimestamp();
  
      return await channel.send({ embeds: [embed] });
    }
  
    const inviter = await client.users.fetch(invite.inviter.id);
  
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('New Member')
      .setDescription(`${member.toString()} joined the server using the invite ${invite.code} from ${inviter.tag}.  The invite was used ${invite.uses} times since its creation.`)
      .setTimestamp();
  
    inviter
      ? await channel.send({ embeds: [embed] })
      : await channel.send({ embeds: [embed.setDescription(`${member.toString()} joined the server but I can't find what invite they used to do it.`)] });
  });

  
  //end//
  /**
   * This arrow function runs periodically using setInterval. It fetches banned users from a database and checks if their ban time has expired.
   * If a ban has expired, it removes the ban from the corresponding guild and deletes the ban entry from the database.
   */
  setInterval(async () => {
    try {
      const bans = await banschema.find();
      if (!bans) return;
  
      for (const ban of bans) {
        if (ban.Time > Date.now()) continue;
  
        const server = await client.guilds.cache.get(ban.Guild);
        if (!server) {
          console.log('No server found');
          await banschema.deleteMany({ Guild: ban.Guild });
          continue;
        }
  
        const guildBans = await server.bans.fetch();
        if (guildBans.size === 0) {
          console.log('No bans found');
          await banschema.deleteMany({ Guild: ban.Guild });
          continue;
        }
  
        const user = client.users.cache.get(ban.User);
        if (!user) {
          console.log('No user found');
          await banschema.deleteMany({ User: ban.User, Guild: ban.Guild });
          continue;
        }
  
        await server.bans.remove(ban.User).catch((err) => {
          console.log('Could not unban');
        });
  
        await banschema.deleteMany({ User: ban.User, Guild: ban.Guild });
      }
    } catch (error) {
      console.error(error);
    }
  }, 30000);
  
  //end///
  //chat gpt//
  
  
  
  
   const configuration = new Configuration({
    apiKey: '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'
  });
  const openai = new OpenAIApi(configuration);
  
  const BOT_CHANNEL = "1101154393291763732"
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.channel.id !== BOT_CHANNEL)  return;
    if (message.content.startsWith('!')) return;
  
    let conversationLog = [
      { role: 'system', content: 'You are a friendly chatbot.' },
    ];
  
    try {
      await message.channel.sendTyping();
      let prevMessages = await message.channel.messages.fetch({ limit: 15 });
      prevMessages.reverse();
      
      prevMessages.forEach((msg) => {
        if (msg.content.startsWith('!')) return;
        if (msg.author.id !== client.user.id && message.author.bot) return;
        if (msg.author.id == client.user.id) {
          conversationLog.push({
            role: 'assistant',
            content: msg.content,
            name: msg.author.username
              .replace(/\s+/g, '_')
              .replace(/[^\w\s]/gi, ''),
          });
        }
  
        if (msg.author.id == message.author.id) {
          conversationLog.push({
            role: 'user',
            content: msg.content,
            name: message.author.username
              .replace(/\s+/g, '_')
              .replace(/[^\w\s]/gi, ''),
          });
        }
      });
  
      const result = await openai
        .createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: conversationLog,
          // max_tokens: 256, // limit token usage
        })
        .catch((error) => {
          console.log(`OPENAI ERR: ${error}`);
        });
      message.reply(result.data.choices[0].message);
    } catch (error) {
      console.log(`ERR: ${error}`);
    }
  }); 
  
  
  
  
  
  
  //end//
  //verify systemm start//
  
  const capschema = require('./Schemas/verify');
  const verifyusers = require('./Schemas/verifyusers');
  const { createCanvas } = require('canvas');
  /**
 *
 * @param {Interaction} interaction
 */


    client.on(Events.InteractionCreate, async interaction => {
        try {

        if (interaction.customId === 'verify') {
 
        if (interaction.guild === null) return;
     
        const verifydata = await capschema.findOne({ Guild: interaction.guild.id });
        const verifyusersdata = await verifyusers.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
     
            if (!verifydata) return await interaction.reply({ content: `The **verification system** has been disabled in this server!`, ephemeral: true});
     
            if (verifydata.Verified.includes(interaction.user.id)) return await interaction.reply({ content: 'You have **already** been verified!', ephemeral: true});
     
                // let letter = ['0','1','2','3','4','5','6','7','8','9','a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H','i','I','j','J','f','F','l','L','m','M','n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U','v','V','w','W','x','X','y','Y','z','Z',]
                // let result = Math.floor(Math.random() * letter.length);
                // let result2 = Math.floor(Math.random() * letter.length);
                // let result3 = Math.floor(Math.random() * letter.length);
                // let result4 = Math.floor(Math.random() * letter.length);
                // let result5 = Math.floor(Math.random() * letter.length);
     
                // const cap = letter[result] + letter[result2] + letter[result3] + letter[result4] + letter[result5];
     
                // const captcha = new CaptchaGenerator()
                // .setDimension(150, 450)
                // .setCaptcha({ font: "Calibri", text: `${cap}`, size: 60, color: "red"})
                // .setDecoy({ opacity: 0.5 })
                // .setTrace({ color: "red" })
     
                // const buffer = captcha.generateSync();
     
                // const verifyattachment = new AttachmentBuilder(buffer, { name: `captcha.png`});

                // Function to generate a random string for the captcha

function generateCaptcha(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < length; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
}

// Function to generate the captcha image
async function generateCaptchaImage(text) {
    const canvas = createCanvas(450,150);
    const ctx = canvas.getContext('2d');

    // Background Color
    // ctx.fillStyle = '#FFFFFF';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // TextColor
    ctx.fillStyle = '#FF0000'; // Red Color
    ctx.font = 'bold 100px Arial'; // first is the bold, px is the size of the text, and Arial is the text Type.
    ctx.textAlign = 'center'; // Center the text horizontally
    ctx.textBaseline = 'middle'; // Center the text vertically
    ctx.fillText(text, canvas.width / 2, canvas.height / 2); // Place the text in the center of the canvas

    return canvas.toBuffer();
}

// Example of how you could use the functions
const captchaText = generateCaptcha(5); // Generate a captcha with a length of 5 characters
generateCaptchaImage(captchaText)
    .then(async (buffer) => {
        const attachment = new AttachmentBuilder(buffer, { name: `captcha.png`});
        const verifyembed = new EmbedBuilder()
        .setColor('Green')
        .setAuthor({ name: `✅ Verification Proccess`})
        .setFooter({ text: `✅ Verification Captcha`})
        .setTimestamp()
        .setImage('attachment://captcha.png')
        .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081199958704791552/largegreen.png')
        .setTitle('> Verification Step: Captcha')
        .setDescription(`• Verify value:\n> Please use the button bellow to \n> submit your captcha!`)
     
                const verifybutton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('✅ Enter Captcha')
                    .setStyle(ButtonStyle.Success)
                    .setCustomId('captchaenter')
                )

                await interaction.reply({ embeds: [verifyembed], components: [verifybutton], files: [attachment], ephemeral: true });
     
                if (verifyusersdata) {
     
                    await verifyusers.deleteMany({
                        Guild: interaction.guild.id,
                        User: interaction.user.id
                    })
     
                    await verifyusers.create ({
                        Guild: interaction.guild.id,
                        User: interaction.user.id,
                        Key: captchaText
                    })
     
                } else {
     
                    await verifyusers.create ({
                        Guild: interaction.guild.id,
                        User: interaction.user.id,
                        Key: captchaText
                    })
     
                }
    })
    .catch(error => {
        console.error('An error occurred while generating the captcha:', error);
    });
     
            } else if (interaction.customId === 'captchaenter') {

                const vermodal = new ModalBuilder()
                    .setTitle(`Verification`)
                    .setCustomId('vermodal')
         
                    const answer = new TextInputBuilder()
                    .setCustomId('answer')
                    .setRequired(true)
                    .setLabel(`• Please sumbit your Captcha code`)
                    .setPlaceholder(`Your captcha code input`)
                    .setStyle(TextInputStyle.Short)
         
                    const vermodalrow = new ActionRowBuilder().addComponents(answer);
                    vermodal.addComponents(vermodalrow);
    
                await interaction.showModal(vermodal);

            } else if (interaction.customId === 'vermodal') {

                if (!interaction.isModalSubmit()) return;
         
                const userverdata = await verifyusers.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
                const verificationdata = await capschema.findOne({ Guild: interaction.guild.id });
         
                if (verificationdata.Verified.includes(interaction.user.id)) return await interaction.reply({ content: `You have **already** verified within this server!`, ephemeral: true});
         
                const modalanswer = interaction.fields.getTextInputValue('answer');
                if (modalanswer === userverdata.Key) {
         
                    const verrole = interaction.guild.roles.cache.get(verificationdata.Role);
         
                    try {
                        await interaction.member.roles.add(verrole);
                    } catch (err) {
                        return await interaction.reply({ content: `There was an **issue** giving you the **<@&${verificationdata.Role}>** role, try again later!`, ephemeral: true})
                    }
         
                    await capschema.updateOne({ Guild: interaction.guild.id }, { $push: { Verified: interaction.user.id }});
                    const channelLog = interaction.guild.channels.cache.get("Your Channel ID");
                    if (!channelLog) {
                        await interaction.reply({ content: 'You have been **verified!**', ephemeral: true});
                        return;
                    } else {
                     const channelLogEmbed = new EmbedBuilder()
                     .setColor(`Green`)
                     .setTitle('⚠️ Someone verified to the server! ⚠️')
                     .setDescription(`<@${interaction.user.id}> Is been verified to the server!`)
                     .setTimestamp()
                     .setFooter({ text: `Verified Logs` })

                     await channelLog.send({ embeds: [channelLogEmbed] });
                     await interaction.reply({ content: 'You have been **verified!**', ephemeral: true});
                    }
         
                } else {
                    const channelLog = interaction.guild.channels.cache.get("Your Channel ID");
                    if (!channelLog) { 
                        await interaction.reply({ content: `**Oops!** It looks like you **didn't** enter the valid **captcha code**!`, ephemeral: true})
                        return;
                    } else {
                     const channelLogEmbed = new EmbedBuilder()
                     .setColor(`Red`)
                     .setTitle('⚠️ Watch out for a wrong verify attempt! ⚠️')
                     .setDescription(`<@${interaction.user.id}> Tries a code from the captcha but he failed, It was the wrong one, Take a look at the person maybe he has troubles when entering the code.\n\nMaybe its a bot so keep a eye on him!`)
                     .setTimestamp()
                     .setFooter({ text: `Verified Logs` })

                     await channelLog.send({ embeds: [channelLogEmbed] });
                     await interaction.reply({ content: `**Oops!** It looks like you **didn't** enter the valid **captcha code**!`, ephemeral: true})
                    }
                }

            }

            } catch (err) {
                console.error(err)
            }  
    });

// Or save it, Or this is also optional to just delete the Data from the database so they need to verify again But make sure to command the other 2 the one that saves the data.
// So here we delete the data once he left the server.
client.on('guildMemberRemove', async member => {
    try {
        const userId = member.user.id;
        
        // Check if the user was verified
        const userverdata = await verifyusers.findOne({ Guild: member.guild.id, User: userId });
        const verificationdata = await capschema.findOne({ Guild: member.guild.id });
        if (userverdata && verificationdata) {
            await capschema.updateOne({ Guild: member.guild.id },{ $pull: { Verified: userId } });
            await verifyusers.deleteOne({ Guild: member.guild.id, User: userId });
            // Now if the user left the server All the data was saved from the person is deleted!
        }
    } catch (err) {
        console.error(err);
    }
    // If there is a error console will tell you
});


////////////////////////////////////

// This one we save the data so he dont have to verify again, "Not Recommended Wich is take too much space in your database."
// When a user leaves the server, save their data in a "LeftUsers" collection or with a flag.
// client.on('guildMemberRemove', async member => {
//     try {
//         const userId = member.user.id;
        
//         // Check if the user was verified
//         const verifyusersdata = await verifyusers.findOne({ Guild: member.guild.id, User: userId });
//         if (verifyusersdata) {
//             // Save their data in the LeftUsers collection or add a "left" flag
//             await LeftUsers.create({
//                 Guild: member.guild.id,
//                 User: userId,
//                 Key: verifyusersdata.Key,
//                 Left: true, // You can add a "left" flag here
//             });
//         }
//     } catch (err) {
//         console.error(err);
//     }
       // If there is a error console will tell you
// });

//     client.on('guildMemberAdd', async member => {
//         try {
//         const userId = member.user.id;

//         // Check if the user has left data in the LeftUsers collection or has a "left" flag
//         const leftUserData = await LeftUsers.findOne({ Guild: member.guild.id, User: userId });

//         if (leftUserData) {
//             // Re-assign the verified role
//             const verificationdata = await capschema.findOne({ Guild: member.guild.id });
//             const verrole = await member.guild.roles.cache.get(verificationdata.Role);
//             await member.roles.add(verrole);

//             await LeftUsers.deleteOne({ Guild: member.guild.id, User: userId });
//         }
//         } catch (err) {
//             console.error(err);
//         }
           // If there is a error console will tell you
//     });

    ////////////////////////////////////

  //verify system end//
  
  ///// uncoment this if your bot on top/gg
  //top.gg stats//
  client.on('ready', () => {
    
    postBotStats();
  });
  
  async function postBotStats() {
    try {
      await topggAPI.postStats({
        serverCount: client.guilds.cache.size,
        shardId: client.shard?.ids[0] || 0, // If sharding, use the first shard ID
        shardCount: client.shard?.count || 1, // If sharding, use the total shard count
      });
      console.log('Successfully posted bot stats to top.gg');
    } catch (error) {
      console.error('Failed to post bot stats to top.gg:', error);
    }
  };
  //end//
  //boton//
  //noprefix//
  // Load the no-prefix commands
  client.noprefixcommands = new Collection();
  const noprefixCommandFiles = fs.readdirSync('./noprefixcommands').filter(file => file.endsWith('.js'));
  for (const file of noprefixCommandFiles) {
    const command = require(`./noprefixcommands/${file}`);
    client.noprefixcommands.set(command.name, command);
  }
  // ... Rest of your code ...
  
  // Message event handler
  client.on('messageCreate', async (message) => {
    // Ignore messages from bots and non-text channels
    if (message.author.bot || !message.guild) return;
  
    // Check if the message content matches any of the no-prefix command names
    const commandName = message.content.toLowerCase();
    if (client.noprefixcommands.has(commandName)) {
      const command = client.noprefixcommands.get(commandName);
      try {
        // Execute the command
        command.execute(client, message);
      } catch (error) {
        console.error(error);
        message.reply('An error occurred while executing the command.');
      }
    }
  });
  //end
  ///leveling-system//
const Canvas = require('canvas');
const levelSchema = require('./Schemas/level');
const levelschema = require('./Schemas/levelsetup');
const { LevelUp } = require('canvafy');

function getRandomColor() {
  return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

client.on('messageCreate', async (message) => {
  if (message.content === '!levelup') {
    const levelUpData = await new LevelUp()
      .setAvatar('https://cdn.discordapp.com/avatars/928259219038302258/cb1bcc0c5616d3fb1527b4ea03c9ae17.png?size=1024')
      .setBackground('image', 'https://cdn.discordapp.com/attachments/1041745966186909826/1096055377289814126/e4a8a79fccae98487a74d8bd1f2357834dfa7295.png')
      .setUsername('Beş')
      .setBorder(getRandomColor())
      .setAvatarBorder(getRandomColor())
      .setOverlayOpacity(0.7)
      .setLevels(55, 56)
      .build();

    message.reply({
      files: [
        {
          attachment: levelUpData,
          name: `levelup-${message.member.id}.png`,
        },
      ],
    });
  }
});

client.on(Events.MessageCreate, async (message, err) => {
  const { guild, author } = message;
  if (message.guild === null) return;
  const leveldata = await levelschema.findOne({ Guild: message.guild.id });

  if (!leveldata || leveldata.Disabled === 'disabled') return;
  let multiplier = 1;

  multiplier = Math.floor(leveldata.Multi);

  if (!guild || author.bot) return;

  levelSchema.findOne({ Guild: guild.id, User: author.id }, async (err, data) => {
    if (err) throw err;

    if (!data) {
      levelSchema.create({
        Guild: guild.id,
        User: author.id,
        XP: 0,
        Level: 0,
      });
    }
  });

  const give = 1;

  const data = await levelSchema.findOne({ Guild: guild.id, User: author.id });

  if (!data) return;

  const requiredXP = data.Level * data.Level * 20 + 20;

  if (data.XP + give >= requiredXP) {
    data.XP += give;
    data.Level += 1;
    await data.save();

    // Generate a level-up image with random colors
    const levelUpData = await new LevelUp()
      .setAvatar(author.displayAvatarURL({ format: 'png', size: 1024 }))
      .setBackground('image', 'https://media.discordapp.net/attachments/1015218530448310395/1192536509597888512/image.png?ex=65a96f2c&is=6596fa2c&hm=da8b11eb2c034008cc8698b81dc7b95a5b6bfc3f6e6cdb08e806a8f58cf73e96&=&format=webp&quality=lossless')
      .setUsername(author.username)
      .setBorder(getRandomColor())
      .setAvatarBorder(getRandomColor())
      .setOverlayOpacity(0.3)
      .setLevels(data.Level - 1, data.Level)
      .build();

    // Send the level-up image to the channel
    message.channel.send({
      content: `Congratulations, ${author.username}! You reached level ${data.Level}!`,
      files: [
        {
          attachment: levelUpData,
          name: `levelup-${message.member.id}.png`,
        },
      ],
    });
  } else {
    if (message.member.roles.cache.find((r) => r.id === leveldata.Role)) {
      data.XP += give * multiplier;
    }
    data.XP += give;
    data.save();
  }
});


  //guess//
  const Schema = require('./Schemas/guess');
  
  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
  
    const data = await Schema.findOne({ channelId: message.channel.id });
  
    if (!data) return;
  
    if (message.content === `${data.number}`) {
      await message.react('✅');
      await message.reply('Wow! That was the right number! 🥳');
      await message.pin();
      await message.channel.send('Successfully deleted number, use `/guess enable` to get a new number!');
      await data.delete();
    }
  
    if (isNaN(message.content)) {
      return;
    }
    if (parseInt(message.content) !== data.number) {
      return message.react(`❌`);
    }
  });
  
  //error logs//
   //const errorChannel = '1101154384492113930'; //replace with your err channel id
  
  //client.on('error', (error) => {
  //  console.error('An error occurred:', error);
   // try {
    //  const channel = client.channels.cache.get(errorChannel);
      //channel.send(`An error occurred: \`\`\`${error}\`\`\``);
   //// } catch (error) {
     // console.error('Failed to send error message:', error);
   // }
  //}); 
  //24/7 handler//
  client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.member.id === client.user.id && !newState.channelId) {
      const guildId = oldState.guild.id;
      const musicData = {}; // Replace with your actual music data storage object
      const dataOptions = musicData[guildId] || { enable: false, channel: null };
  
      if (dataOptions.enable && dataOptions.channel === oldState.channelId) {
        try {
          joinVoiceChannel({
            channelId: oldState.channelId,
            guildId: guildId,
            adapterCreator: oldState.guild.voiceAdapterCreator,
          });
        } catch (error) {
          console.error('Error rejoining voice channel:', error);
        }
      }
    }
  });
  //server joined//
  client.on('guildCreate', async (guild) => {
      const channel = await client.channels.cache.get('1101154381497368717'); //replace with your server join channel id
      const name = guild.name;
      const memberCount = guild.memberCount;
      const owner = guild.ownerId;
  
      const embed = new EmbedBuilder()
          .setColor("Green")
          .setTitle("New server joined")
          .addFields({ name: 'Server Name', value: `> ${name}` })
          .addFields({ name: 'Server Member Count', value: `> ${memberCount}` })
          .addFields({ name: 'Server Owner', value: `> ${owner}` })
          .addFields({ name: 'Server Age', value: `> <t:${Math.floor(guild.createdTimestamp / 1000)}:R>` })
          .setTimestamp();
      
      await channel.send({ embeds: [embed] });
  });
  ///guild leave//
  client.on('guildDelete', async (guild) => {
      const channel = await client.channels.cache.get('1101154382902468658'); //replace with your server  leve logs channel id
      const name = guild.name;
      const memberCount = guild.memberCount;
      const owner = guild.ownerId;
  
      const embed = new EmbedBuilder()
          .setColor("Red")
          .setTitle("Server left")
          .addFields({ name: 'Server Name', value: `> ${name}` })
          .addFields({ name: 'Server Member Count', value: `> ${memberCount}` })
          .addFields({ name: 'Server Owner', value: `> ${owner}` })
          .setTimestamp();
      
      await channel.send({ embeds: [embed] });
  });
  
  
  //command logging
  client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.inGuild()) return;
      if (!interaction.isCommand()) return;
      const channel = await client.channels.cache.get('1101154387201622189'); //replace with your server commands logs channel id
      const server = interaction.guild.name;
      const user = interaction.user.username;
      const userID = interaction.user.id;
  
  const embed = new EmbedBuilder()
  .setColor("Green")
  .setTitle('🌐 chat command used')
  .addFields({ name: 'server name', value: `${server}`})
  .addFields({ name: 'chat command', value: `${interaction}`})
  .addFields({ name: 'Command user', value: `${user} / ${userID}`})
  .setTimestamp()
  .setFooter({ text: 'chat command used' }); // pass an object with a `text` property
  
      await channel.send({ embeds: [embed] });
  });
  

  //context handler//
  client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isUserContextMenuCommand()) return;
    // Get the User's username from context menu
    const { username } = interaction.targetUser;
    console.log(username);
  });
  //nodejs-events
  process.on("unhandledRejection", e => {
    console.log(e)
  })
  process.on("uncaughtException", e => {
    console.log(e)
  })
  process.on("uncaughtExceptionMonitor", e => {
    console.log(e)
  })
  //
  client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    leaveOnEmpty: false,
    emptyCooldown: 10,
    savePreviousSongs: true,
    nsfw: true,
    joinNewVoiceChannel: true,
    //plugins: [new SpotifyPlugin(), new SoundCloudPlugin]
  });
  client.config = require("./config.json");
  logs(client, {
    debug: true,
  });
  client.giveawayConfig = require("./config.js");
  client.commands = new Collection();
  client.subCommands = new Collection(); //sub commands
  client.modals = new Collection();
  client.buttons = new Collection();
  client.errors = new Collection();
  client.contextMenu = new Collection();
  client.voiceGenerator = new Collection();
  const contextMenus = new Collection();



  
  ['giveawaysEventsHandler', 'giveawaysManager'].forEach((x) => {
    require(`./Utils/${x}`)(client);
  })
  
  module.exports = client;
 


  client.login('your_bot_token').then(() => {
    loadEvents(client);
    loadCommands(client);
    handleLogs(client);
  messageLogging(client)
  
  });
  /// html code
  // Function to generate report data
  function generateReportData(channel) {
    const messageCount = channel.messages.cache.size;
    const userParticipation = {};
  
    for (const message of channel.messages.cache.values()) {
      if (!userParticipation[message.author.id]) {
        userParticipation[message.author.id] = {
          username: message.author.tag,
          messageCount: 0
        };
      }
  
      userParticipation[message.author.id].messageCount++;
    }
  
    // TODO: Implement keyword usage analysis
  
    return {
      messageCount: messageCount,
      userParticipation: userParticipation
    };
  }
  
  // Function to generate HTML report
  function generateHTMLReport(reportData) {
    let html = '<html><head><title>Channel Activity Report</title></head><body>';
  
    html += `<h1>Channel Activity Report</h1>
      <p>Channel: ${channel.name}</p>
      <p>Report Generated At: ${new Date().toISOString()}</p>`;
  
    html += `<h2>Message Count</h2>
      <p>Total Messages: ${reportData.messageCount}</p>`;
  
    html += `<h2>User Participation</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Message Count</th>
          </tr>
        </thead>
        <tbody>`;
  
    for (const user of Object.values(reportData.userParticipation)) {
      html += `<tr>
        <td>${user.username}</td>
        <td>${user.messageCount}</td>
      </tr>`;
    }
  
    html += `</tbody>
      </table>`;
  
    // TODO: Add keyword usage section
  
    html += '</body></html>';
    return html;
  }