const { Client, ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const config = require('../../config.json');
require('colors');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    // Ensure client.guildSettings is initialized as a Map
    client.guildSettings = new Map();

    try {
      // Connect to MongoDB
      await mongoose.connect(config.mongodb || '', {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000, // Set a longer timeout if needed
      });

      if (mongoose.connection.readyState === 1) {
       console.log("Connected to Database")
      }
      
      // Premium system
      const premiumGuildDB = require('../../Schemas/premiumGuildDB');
      const guilds = await premiumGuildDB.find();
      for (let guild of guilds) {
        client.guildSettings.set(guild.ID, guild);
      }

      // Statistics
      const totalMembers = client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0);
      const totalServers = client.guilds.cache.size;
      const totalChannels = client.channels.cache.size;
      const shardCount = client.shard ? client.shard.count : 1;

      // Presence activities
      const activities = [
        `in ${totalServers} server${totalServers > 1 ? 's' : ''}`,
        `in ${totalChannels} channel${totalChannels > 1 ? 's' : ''}`,
        `/help & ?help`,
        `on ${shardCount} shard${shardCount > 1 ? 's' : ''}`
      ];

      let i = 0;

     setInterval(() => {
      client.user.setPresence({ activities: [{ name: activities[i++ % activities.length], type: ActivityType.Watching }] });
    }, 15000);
    

      console.log(`[ONLINE]`.green + ` ${client.user.tag} is online in ${totalServers} server(s) with ${totalMembers} members and ${totalChannels} channels!`);
    } catch (error) {
      console.error(`MongoDB connection error: ${error.message}`);
    }
  },
};
  