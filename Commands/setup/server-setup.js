const { SlashCommandBuilder, PermissionsBitField, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, setPosition } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("server-setup")
        .setDescription("Sets up the whole server (embeds, channel, ect)")

        .addStringOption((option) => option.setName("setup").setDescription("sets up the server using commands!").setRequired(true).addChoices(

            { name: "basic", value: "basic" },
            { name: "advanced", value: "advanced" },
            { name: "premium", value: "premium" })),


    async execute(interaction, client) {

        if (interaction.user.id !== "903237169722834954") return await interaction.reply({ content: "<:purple_arrow:1082692693479673936> This command is only for Premium Users", ephemeral: true });

        const setup = interaction.options.getString("setup");

        switch (setup) {
            case "basic": {


                const basicEmbed = new EmbedBuilder()
                    .setColor("Orange")
                    .setTitle("⚠️ Server Creation warning ⚠️")
                    .setDescription("Clicking the confirm button or ✅ all channel/categories may be deleted and replaced to set up this server!")
                    .setTimestamp()
                    .setFooter({ text: "Setup warning" });

                const buttons = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder()
                        .setEmoji("✖️")
                        .setLabel("Cancel")
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId("button1"),

                    new ButtonBuilder()
                        .setEmoji("✅")
                        .setLabel("confirm")
                        .setStyle(ButtonStyle.Success)
                        .setCustomId("button2"));


                await interaction.reply({ embeds: [basicEmbed], components: [buttons] });
                const collector = interaction.channel.createMessageComponentCollector();

                collector.on("collect", async (i) => {

                    if (i.customId === "button1") {
                        basicEmbed.setColor("DarkGreen");
                        basicEmbed.setTitle("Server Set-up Canceled");
                        basicEmbed.setDescription("The server set-up has been canceled, if this was not intended re-run the command.");
                        basicEmbed.setTimestamp();
                        const message = i.update({ embeds: [basicEmbed], components: [], fetchReply: true });

                        setTimeout(() => { message.delete(); }, 5000)

                        return;
                    }

                    if (i.customId === "button2") {
                        basicEmbed.setColor("Gold");
                        basicEmbed.setTitle("Initiated");
                        basicEmbed.setDescription("The server set-up has been initiated.");
                        basicEmbed.setTimestamp();
                        await i.update({ embeds: [basicEmbed], components: [] });

                        await new Promise((resolve) => setTimeout(resolve, 5000));
                    } // reuse embed and button code for other values

                    if (interaction.guild.channels.cache.size) {
                        for await (const [, channel] of interaction.guild.channels.cache) await channel.delete().catch(() => null);
                    }

                    const { guild } = interaction;

                    const categorybasic = await guild.channels.create({
                        type: ChannelType.GuildCategory,
                        name: "Important"
                    });

                    await guild.channels.create({
                        name: "🙌・welcome", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: categorybasic, // Category ID
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [PermissionsBitField.Flags.SendMessages]
                            }
                        ]
                    });

                    await guild.channels.create({
                        name: "📚・rules", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: categorybasic, // Category ID
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [PermissionsBitField.Flags.SendMessages]
                            }
                        ]
                    });

                    const category = interaction.guild.categories.cache.find((category) => category.name.includes("report"));
                    const channel = interaction.guild.channels.cache.find((channel) => channel.name.includes("rules")); // when reusing this line change the variable (channel) change to like (channel2) (used to find channels)

                    const rulesembed = new EmbedBuilder()
                        .setTitle("Rules")
                        .setColor("Orange")
                        .addFields({ name: "**Discord Server Rules**", value: "**When joining the server all rules are agreed to!**" })
                        .addFields({ name: "• 1) __Discord ToS and Guidelines__", value: "All users need to follow Discord's Terms of Service and Community Guidelines." })
                        .addFields({ name: "• 2) __Advertising__", value: "No user should post ads, In members DM's of within the server its self, If you wish to partner Ask the owner." })
                        .addFields({ name: "• 3) __Scamming__", value: "No user will scam or attempt to scam members/staff for Real items or online items." })
                        .addFields({ name: "• 4) __Racist language__", value: "Any racial slurs or racist behaviour/comments are NOT accepted in this server. This will be an instant Ban." })
                        .addFields({ name: "• 5) __Respect__", value: "Respecting the admin and mod team is really important. The moderation team has the final say." })
                        .addFields({ name: "• 6) __NSFW__", value: "There will be 0 NSFW images, videos or text, breaking this rule is an instant and permanent ban." })
                        .addFields({ name: "• 7) __Selling__", value: "There will be no selling online itmes for REAL currency." })
                        .addFields({ name: "• 8) __No staff impersonation__", value: "Do not attempt to Impersonate staff members." })
                        .addFields({ name: "• 9) __Loopholes__", value: "Do not attempt to bypass any rules with loopholes within the rules, if there are loopholes being exploited users will be banned for using it, Please report any found loopholes." })
                        .addFields({ name: "• 10) __Server raiding__", value: "Do not try to set up and attempt to raid this server or any server." })
                        .addFields({ name: " __**Warnings**__", value: "minor offences will result in a warn." });

                    channel.send({ embeds: [rulesembed] });

                    await guild.channels.create({
                        name: "📢・announcements", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: categorybasic, // Category ID
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [PermissionsBitField.Flags.SendMessages]
                            }
                        ]
                    });

                    await guild.channels.create({
                        name: "💎・boosts", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: categorybasic, // Category ID
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [PermissionsBitField.Flags.SendMessages]
                            }
                        ]
                    });

                    await guild.channels.create({
                        name: "⚠・report", // Channel Name
                        type: ChannelType.GuildText, // Channel Type 🙌・welcome
                        parent: categorybasic // Category ID
                    });


                    const categorybasic2 = await guild.channels.create({ // change category variable when reusing this to make new category
                        type: ChannelType.GuildCategory,
                        name: "Community"
                    });

                    await guild.channels.create({
                        name: "💬・main-chat", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: categorybasic2 // Category ID
                    });

                    await guild.channels.create({
                        name: "🤖・commands", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: categorybasic2 // Category ID
                    });

                    await guild.channels.create({
                        name: "🆙・rank-up", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: categorybasic2, // Category ID
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [PermissionsBitField.Flags.SendMessages]
                            }
                        ]
                    });


                    const categorybasic3 = await guild.channels.create({ // change category variable when reusing this to make new category
                        type: ChannelType.GuildCategory,
                        name: "Staff"
                    });

                    // deleting roles to prepare staff roles + member roles later
                    if (interaction.guild.roles.cache.size) {
                        for await (const [, role] of interaction.guild.roles.cache) if (role.editable) await role.delete().catch(() => null);
                    }

                    // roles creations
                    await interaction.guild.roles.create({
                        name: "owner",
                        color: "#D60620",
                        hoist: true,
                        permissions: [
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.Administrator]
                    });

                    await interaction.guild.roles.create({
                        name: "admin",
                        color: "#7f00ff",
                        hoist: true,
                        permissions: [
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.BanMembers,
                            PermissionsBitField.Flags.KickMembers,
                            PermissionsBitField.Flags.ViewAuditLog,
                            PermissionsBitField.Flags.ManageMessages,
                            PermissionsBitField.Flags.MuteMembers]
                    });

                    await interaction.guild.roles.create({
                        name: "moderator",
                        color: "#FF8303",
                        hoist: true,
                        permissions: [
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.ViewAuditLog,
                            PermissionsBitField.Flags.ManageMessages,
                            PermissionsBitField.Flags.MuteMembers]
                    });

                    await interaction.guild.roles.create({
                        name: "staff",
                        color: "#d9ff00",
                        hoist: true,
                        permissions: [
                            PermissionsBitField.Flags.ManageMessages,
                            PermissionsBitField.Flags.ViewAuditLog,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel]
                    });

                    await interaction.guild.roles.create({
                        name: "member",
                        color: "#1338BE",
                        hoist: true,
                        permissions: [
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel]
                    });


                    const role = interaction.guild.roles.cache.find((r) => r.name === "staff"); // to find roles

                    await guild.channels.create({
                        name: "🔔・announcements", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: categorybasic3, // Category ID
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: role.id,
                                allow: [PermissionsBitField.Flags.ViewChannel] // const role is used for role.id
                            }
                        ]
                    });

                    await guild.channels.create({
                        name: "🔔・staff-chat", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: categorybasic3, // Category ID
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: role.id,
                                allow: [PermissionsBitField.Flags.ViewChannel] // const role is used for role.id
                            }
                        ]
                    });

                    await guild.channels.create({
                        name: "🔔・staff-cmd", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: categorybasic3, // Category ID
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: role.id,
                                allow: [PermissionsBitField.Flags.ViewChannel] // const role is used for role.id
                            }
                        ]
                    });

                    await guild.channels.create({
                        name: "🔔・mod-logs", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: categorybasic3, // Category ID
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: role.id,
                                allow: [PermissionsBitField.Flags.ViewChannel] // const role is used for role.id
                            }]
                    });

                    const basicdone1 = interaction.guild.channels.cache.find((channel) => channel.name.includes("mod-logs"));

                    const basiccomplete = new EmbedBuilder()
                        .setTitle("Set-up Completed")
                        .setColor("Green")
                        .setDescription("your basic server has been set-up with bloom, enjoy your server!")
                        .setTimestamp()
                        .setFooter({ text: "you can delete this embed" });

                    basicdone1.send(({ embeds: [basiccomplete] }));


                });

                break;
            }
            














            
            case "advanced": {

                const advancedembed = new EmbedBuilder()
                    .setColor("LuminousVividPink")
                    .setTitle("⚠️ Server Creation warning ⚠️")
                    .setDescription("Clicking the confirm button or ✅ all channel/categories may be deleted and replaced to set up this server!")
                    .setTimestamp()
                    .setFooter({ text: "Setup warning" });

                const advancedbuttons = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder()
                        .setEmoji("✖️")
                        .setLabel("Cancel")
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId("button3"),

                    new ButtonBuilder()
                        .setEmoji("✅")
                        .setLabel("confirm")
                        .setStyle(ButtonStyle.Success)
                        .setCustomId("button4"));


                await interaction.reply({ embeds: [advancedembed], components: [advancedbuttons] });
                const advancedcollector = interaction.channel.createMessageComponentCollector();

                advancedcollector.on("collect", async (i) => {

                    if (i.customId === "button3") {
                        advancedembed.setColor("DarkGreen");
                        advancedembed.setTitle("Server Set-up Canceled");
                        advancedembed.setDescription("The server set-up has been canceled, if this was not intended re-run the command.");
                        advancedembed.setTimestamp();
                        await i.update({ embeds: [advancedembed], components: [] });

                        return;
                    }


                    if (i.customId === "button4") {
                        advancedembed.setColor("Gold");
                        advancedembed.setTitle("Initiated");
                        advancedembed.setDescription("The Advanced server set-up has been initiated.");
                        advancedembed.setTimestamp();
                        await i.update({ embeds: [advancedembed], components: [] });


                        await new Promise((resolve) => setTimeout(resolve, 5000));
                    }


                    
                    //create roles here first for advanced perms
                    
                    if (interaction.guild.roles.cache.size) {
                        for await (const [, role] of interaction.guild.roles.cache) if (role.editable) await role.delete().catch(() => null);
                    }

                    // roles creations
                    await interaction.guild.roles.create({
                        name: "owner",
                        color: "#D60620",
                        hoist: true,
                        permissions: [
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.Administrator],
                            Position: 1
                    });

                    await interaction.guild.roles.create({
                        name: "co-owner",
                        color: "#FFFFFF",
                        hoist: true,
                        permissions: [
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.BanMembers,
                            PermissionsBitField.Flags.KickMembers,
                            PermissionsBitField.Flags.ViewAuditLog,
                            PermissionsBitField.Flags.ManageMessages,
                            PermissionsBitField.Flags.MuteMembers,
                            PermissionsBitField.Flags.Administrator],
                            Position: 2
                    });


                    await interaction.guild.roles.create({
                        name: "senior-admin",
                        color: "#0a0612",
                        hoist: true,
                        permissions: [
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.BanMembers,
                            PermissionsBitField.Flags.KickMembers,
                            PermissionsBitField.Flags.ViewAuditLog,
                            PermissionsBitField.Flags.ManageMessages,
                            PermissionsBitField.Flags.MuteMembers,
                            PermissionsBitField.Flags.DeafenMembers],
                            Position: 3
                    });


                    await interaction.guild.roles.create({
                        name: "admin",
                        color: "#7f00ff",
                        hoist: true,
                        permissions: [
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.BanMembers,
                            PermissionsBitField.Flags.KickMembers,
                            PermissionsBitField.Flags.ViewAuditLog,
                            PermissionsBitField.Flags.ManageMessages,
                            PermissionsBitField.Flags.MuteMembers],
                            Position: 4
                    });


                    await interaction.guild.roles.create({
                        name: "senior-moderator",
                        color: "#FCE205",
                        hoist: true,
                        permissions: [
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.ViewAuditLog,
                            PermissionsBitField.Flags.ManageMessages,
                            PermissionsBitField.Flags.MuteMembers,
                            PermissionsBitField.Flags.KickMembers],
                            Position: 5
                    });

                    await interaction.guild.roles.create({
                        name: "moderator",
                        color: "#FF8303",
                        hoist: true,
                        permissions: [
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.ViewAuditLog,
                            PermissionsBitField.Flags.ManageMessages,
                            PermissionsBitField.Flags.MuteMembers],
                            Position: 6
                    });

                    await interaction.guild.roles.create({
                        name: "staff",
                        color: "#1167b1",
                        hoist: true,
                        permissions: [
                            PermissionsBitField.Flags.ManageMessages,
                            PermissionsBitField.Flags.ViewAuditLog,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel],
                            Position: 7
                    });

                    await interaction.guild.roles.create({
                        name: "Giveaway-host",
                        color: "#010101",
                        hoist: true,
                        permissions: [
                            PermissionsBitField.Flags.ManageMessages,
                            PermissionsBitField.Flags.ViewAuditLog,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel],
                            Position: 8
                    });

                    await interaction.guild.roles.create({
                        name: "VIP",
                        color: "#D4AF37",
                        hoist: true,
                        permissions: [
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel],
                            Position: 9
                    });

                    await interaction.guild.roles.create({
                        name: "member",
                        color: "#1338BE",
                        hoist: true,
                        permissions: [
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ViewChannel],
                            Position: 10
                    });

                    
                    const senioradminrole = interaction.guild.roles.cache.find((r) => r.name === "senior-admin"); // to find roles

                    const adminrole = interaction.guild.roles.cache.find((r) => r.name === "admin"); // to find roles

                    const seniormodrole = interaction.guild.roles.cache.find((r) => r.name === "senior-moderator"); // to find roles

                    const modrole = interaction.guild.roles.cache.find((r) => r.name === "moderator"); // to find roles

                    const staffrole = interaction.guild.roles.cache.find((r) => r.name === "staff"); // to find roles

                    const giverole = interaction.guild.roles.cache.find((r) => r.name === "Giveaway-host"); // to find roles

                    const viprole = interaction.guild.roles.cache.find((r) => r.name === "VIP"); // to find roles
                    
                    const memberrole = interaction.guild.roles.cache.find((r) => r.name === "member"); // to find roles




                    
                    if (interaction.guild.channels.cache.size) {
                    for await (const [, channel] of interaction.guild.channels.cache) await channel.delete().catch(() => null);
                    }


                    const ids = [memberrole.id, viprole.id, giverole.id, staffrole.id, modrole.id, seniormodrole.id, adminrole.id]; const overwritesmute = [];
                    for await (const id of ids) overwritesmute.push({ id: id, deny: [PermissionsBitField.Flags.SendMessages], allow: [PermissionsBitField.Flags.ViewChannel] });


                    const ids0 = [adminrole.id, senioradminrole.id]; const overwritesadmin = [];
                    for await (const id of ids0) overwritesadmin.push({ id: id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] });

                    const { guild } = interaction;


                    const advancedcategory = await guild.channels.create({
                        type: ChannelType.GuildCategory,
                        name: "Important"
                    });

                
                    await guild.channels.create({
                        name: "🙌・welcome", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory, // Category ID
                        permissionOverwrites: overwritesmute
                    });

                    await guild.channels.create({
                        name: "📚・rules", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory, // Category ID
                        permissionOverwrites: overwritesmute
                    });

                    const channel = interaction.guild.channels.cache.find((channel) => channel.name.includes("rules")); // when reusing this line change the variable (channel) change to like (channel2) (used to find channels)

                    const advancedrules = new EmbedBuilder()
                        .setTitle("Rules")
                        .setColor("Orange")
                        .addFields({ name: "**Discord Server Rules**", value: "**When joining the server all rules are agreed to!**" })
                        .addFields({ name: "• 1) __Discord ToS and Guidelines__", value: "All users need to follow Discord's Terms of Service and Community Guidelines." })
                        .addFields({ name: "• 2) __Advertising__", value: "No user should post ads, In members DM's of within the server its self, If you wish to partner Ask the owner." })
                        .addFields({ name: "• 3) __Scamming__", value: "No user will scam or attempt to scam members/staff for Real items or online items." })
                        .addFields({ name: "• 4) __Racist language__", value: "Any racial slurs or racist behaviour/comments are NOT accepted in this server. This will be an instant Ban." })
                        .addFields({ name: "• 5) __Respect__", value: "Respecting the admin and mod team is really important. The moderation team has the final say." })
                        .addFields({ name: "• 6) __NSFW__", value: "There will be 0 NSFW images, videos or text, breaking this rule is an instant and permanent ban." })
                        .addFields({ name: "• 7) __Selling__", value: "There will be no selling online itmes for REAL currency." })
                        .addFields({ name: "• 8) __No staff impersonation__", value: "Do not attempt to Impersonate staff members." })
                        .addFields({ name: "• 9) __Loopholes__", value: "Do not attempt to bypass any rules with loopholes within the rules, if there are loopholes being exploited users will be banned for using it, Please report any found loopholes." })
                        .addFields({ name: "• 10) __Server raiding__", value: "Do not try to set up and attempt to raid this server or any server." })
                        .addFields({ name: " __**Warnings**__", value: "minor offences will result in a warn." });

                    channel.send({ embeds: [advancedrules] });
                
                    await guild.channels.create({
                        name: "📢・announcements", // Channel Name🍀┃pings
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory, // Category ID
                        permissionOverwrites: overwritesmute, ...overwritesadmin
                    });

                    await guild.channels.create({
                        name: "💎・boosts", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory, // Category ID
                        permissionOverwrites: overwritesmute, ...overwritesadmin
                    });

                    await guild.channels.create({
                        name: "🍀・pings", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory, // Category ID
                        permissionOverwrites: overwritesmute
                    });

                    await guild.channels.create({
                        name: "🎨・colors", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory, // Category ID
                        permissionOverwrites: overwritesmute
                    });

                    const ids1 = [memberrole.id,viprole.id, giverole.id, staffrole.id, modrole.id, seniormodrole.id, adminrole.id]; const overwritestalk = [];
                    for await (const id of ids1) overwritestalk.push({ id: id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] });

                    await guild.channels.create({
                        name: "⚠・report", // Channel Name
                        type: ChannelType.GuildText, // Channel Type 🙌・welcome
                        parent: advancedcategory, // Category ID
                        permissionOverwrites: overwritestalk
                        
                    });



                    const advancedcategory2 = await guild.channels.create({
                        type: ChannelType.GuildCategory,
                        name: "social"
                    });


                    await guild.channels.create({
                        name: "💬・main-chat", // Channel Name
                        type: ChannelType.GuildText, // Channel Type 🙌・welcome
                        parent: advancedcategory2, // Category ID
                        permissionOverwrites: overwritestalk
                        
                    });

                    await guild.channels.create({
                        name: "🤡・memes", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory2, // Category ID 
                    });

                    await guild.channels.create({
                        name: "🤖・commands", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory2 // Category ID
                    });

                    await guild.channels.create({
                        name: "📷・media", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory2 // Category ID
                    });

                    await guild.channels.create({
                        name: "🥇・rank-up", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory2, // Category ID
                        permissionOverwrites: overwritesmute
                    });


                    const advancedcategory3 = await guild.channels.create({
                        type: ChannelType.GuildCategory,
                        name: "Events"
                    });

                    await guild.channels.create({
                        name: "🎪・events", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory3, // Category ID 
                        permissionOverwrites: overwritesmute
                    });

                    await guild.channels.create({
                        name: "minigames", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory3, // Category ID 
                        permissionOverwrites: overwritesmute
                    });

                    const advancedcategory4 = await guild.channels.create({
                        type: ChannelType.GuildCategory,
                        name: "GIVEAWAYS"
                    });

                    await guild.channels.create({
                        name: "🎉╭・big-giveaways", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory4, // Category ID 
                        permissionOverwrites: [
                            {
                                id: giverole,
                                allow: [PermissionsBitField.Flags.SendMessages]
                            },
                            ...overwritesmute],
                            
                    });


                    await guild.channels.create({
                        name: "🎉┃giveaways", // Channel Name🥳╰・open-invites
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory4, // Category ID 
                        permissionOverwrites: [
                            {
                                id: giverole,
                                allow: [PermissionsBitField.Flags.SendMessages]
                            },
                            ...overwritesmute],
                            
                    });


                    await guild.channels.create({
                        name: "🥳╰・flash-giveaways", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory4, // Category ID 
                        permissionOverwrites: [
                            {
                                id: giverole,
                                allow: [PermissionsBitField.Flags.SendMessages]
                            },
                            ...overwritesmute],
                            
                    });


                    const advancedcategory5 = await guild.channels.create({
                        type: ChannelType.GuildCategory,
                        name: "Tickets"
                    });

                    await guild.channels.create({
                        name: "📩╭・tickets", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory5, // Category ID 
                        permissionOverwrites: overwritesmute
                    });

                    await guild.channels.create({
                        name: "📢┃staff-tickets", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory5, // Category ID 
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: memberrole,
                                deny: [PermissionsBitField.Flags.ViewChannel]
                            },
                            {
                                id: viprole,
                                deny: [PermissionsBitField.Flags.ViewChannel]
                            },
                            ...overwritesmute, ...overwritesadmin],
                            
                        
                    });

                    await guild.channels.create({
                        name: "📨╰・giveaway-tickets", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory5, // Category ID 
                        permissionOverwrites: overwritesmute
                    });

                    const ids2 = [memberrole.id,viprole.id, interaction.guild.id]; const overwritesprivate = [];
                    for await (const id of ids2) overwritesprivate.push({ id: id, deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] });


                    const ids3 = [giverole.id, staffrole.id, modrole.id, seniormodrole.id, adminrole.id]; const overwritestaffmute = [];
                    for await (const id of ids3) overwritestaffmute.push({ id: id, allow: [PermissionsBitField.Flags.ViewChannel], deny: [PermissionsBitField.Flags.SendMessages] });


                    const ids4 = [giverole.id, staffrole.id, modrole.id, seniormodrole.id, adminrole.id]; const overwritestafftalk = [];
                    for await (const id of ids4) overwritestafftalk.push({ id: id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]});

                    const ids5 = [giverole.id, staffrole.id, modrole.id, seniormodrole.id]; const overwritestaffhide = [];
                    for await (const id of ids5) overwritestaffhide.push({ id: id, deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]});





                    const advancedcategory6 = await guild.channels.create({
                        type: ChannelType.GuildCategory,
                        name: "STAFF"
                    });

                    await guild.channels.create({
                        name: "📣╭・announcements", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory6, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestaffmute, ...overwritesadmin]
                    });

                    await guild.channels.create({
                        name: "📜┃・staff-rules", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory6, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestaffmute, ...overwritesadmin]
                    });


                    //staff rules embed
                    const channel2 = interaction.guild.channels.cache.find((channel) => channel.name.includes("staff-rules")); // when reusing this line change the variable (channel) change to like (channel2) (used to find channels)

                    const staffrules = new EmbedBuilder()
                    .setTitle('Staff Rules')
                    .setColor('Random')
                    .addFields({ name: "**Staff team rules**", value: "**When joining the staff team, all rules are agreed to!**" })
                    .addFields({ name: "• 1) __Discord ToS and Guidelines__", value: "As staff members you represent the server and its values, so you must uphold the rules!." })
                    .addFields({ name: "• 2) __Respect__", value: "You must still be respectful towards the community and other staff members." })
                    .addFields({ name: "• 3) __Decisions__", value: "Although your a staff member you must still listen to higher-ups, they have the final call." })
                    .addFields({ name: "• 4) __Decision making__", value: "As a staff team member its your responsibility to make quick and fair decisions." })
                    .addFields({ name: "• 5) __Advertising__", value: "Do not advertise other servers without permission from higher staff." })
                    .addFields({ name: "• 6) __fighting__", value: "Do not start fight between one another or between members for the fun of it." })
                    .addFields({ name: "• 7) __Begging__", value: "Don't beg high staff for things." })

                    channel2.send({ embeds: [staffrules] });


                    await guild.channels.create({
                        name: "🎀┃・staff-chat", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory6, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestafftalk, ...overwritesadmin]
                    });

                    await guild.channels.create({
                        name: "💼┃・staff-commands", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory6, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestafftalk, ...overwritesadmin]
                    });

                    await guild.channels.create({
                        name: "🔒╰・admin-chat", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory6, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestaffhide, ...overwritesadmin]
                    });

                    await guild.channels.create({
                        name: "staff-vc", // Channel Name
                        type: ChannelType.GuildVoice, // Channel Type
                        parent: advancedcategory6, // Category ID 
                        permissionOverwrites: [...overwritesprivate]
                    });


                    const advancedcategory7 = await guild.channels.create({
                        type: ChannelType.GuildCategory,
                        name: "LOGS"
                    });

                    await guild.channels.create({
                        name: "💼┃messages", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory7, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestaffhide, ...overwritesadmin]
                    });

                    await guild.channels.create({
                        name: "💼┃modlogs", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory7, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestaffhide, ...overwritesadmin]
                    });

                    await guild.channels.create({
                        name: "💼┃security-logs", // Channel Nameserver-log
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory7, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestaffhide, ...overwritesadmin]
                    });

                    await guild.channels.create({
                        name: "💼┃server-log", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory7, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestaffhide, ...overwritesadmin]
                    });

                    const advancedcategory8 = await guild.channels.create({
                        type: ChannelType.GuildCategory,
                        name: "VC"
                    });
    
                    await guild.channels.create({
                        name: "Gaming 1", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: advancedcategory8, // Category ID 
                    });
    
                    await guild.channels.create({
                        name: "Gaming 2", // Channel Name
                        type: ChannelType.GuildVoice, // Channel Type
                        parent: advancedcategory8, // Category ID 
                    });
    
                    await guild.channels.create({
                        name: "General", // Channel Name
                        type: ChannelType.GuildVoice, // Channel Type
                        parent: advancedcategory8, // Category ID 
                    });


                    //set-up complete embed

                const advancedcomplete = interaction.guild.channels.cache.find((channel) => channel.name.includes("server-log"));

                const advanceddone1 = new EmbedBuilder()
                    .setTitle("Set-up Completed")
                    .setColor("Green")
                    .setDescription("your advanced server has been set-up with bloom, enjoy your server!")
                    .setTimestamp()
                    .setFooter({ text: "you can delete this embed" });

                    advancedcomplete.send({ embeds: [advanceddone1] });




                    
                });

                break;
            }


















            case "premium": {

                const premiumembed = new EmbedBuilder()
                    .setColor("LuminousVividPink")
                    .setTitle("⚠️ Server Creation warning ⚠️")
                    .setDescription("Clicking the confirm button or ✅ all channel/categories may be deleted and replaced to set up this server!")
                    .setTimestamp()
                    .setFooter({ text: "Setup warning" });

                const premiumbuttons = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder()
                        .setEmoji("✖️")
                        .setLabel("Cancel")
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId("button5"),

                    new ButtonBuilder()
                        .setEmoji("✅")
                        .setLabel("confirm")
                        .setStyle(ButtonStyle.Success)
                        .setCustomId("button6"));


                await interaction.reply({ embeds: [premiumembed], components: [premiumbuttons] });
                const premiumcollector = interaction.channel.createMessageComponentCollector();

                premiumcollector.on("collect", async (i) => {

                if (i.customId === "button5") {
                    premiumembed.setColor("DarkGreen");
                    premiumembed.setTitle("Server Set-up Canceled");
                    premiumembed.setDescription("The server set-up has been canceled, if this was not intended re-run the command.");
                    premiumembed.setTimestamp();
                    await i.update({ embeds: [premiumembed], components: [] });

                    return;
                }


                if (i.customId === "button6") {
                    premiumembed.setColor("Gold");
                    premiumembed.setTitle("Initiated");
                    premiumembed.setDescription("The Premium server set-up has been initiated.");
                    premiumembed.setTimestamp();
                    await i.update({ embeds: [premiumembed], components: [] });


                    await new Promise((resolve) => setTimeout(resolve, 5000));
                };


                if (interaction.guild.roles.cache.size) {
                for await (const [, role] of interaction.guild.roles.cache) if (role.editable) await role.delete().catch(() => null);
                }

                // roles creations

                await interaction.guild.roles.create({
                    name: "-",
                    color: "#a8a8a8",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.Administrator],
                        Position: 1
                });

                await interaction.guild.roles.create({
                    name: "owner",
                    color: "#D60620",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.Administrator],
                        Position: 2
                });

                await interaction.guild.roles.create({
                    name: "*",
                    color: "#a8a8a8",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.Administrator],
                        Position: 3
                });

                await interaction.guild.roles.create({
                    name: "co-owner",
                    color: "#FFFFFF",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.BanMembers,
                        PermissionsBitField.Flags.KickMembers,
                        PermissionsBitField.Flags.ViewAuditLog,
                        PermissionsBitField.Flags.ManageMessages,
                        PermissionsBitField.Flags.MuteMembers,
                        PermissionsBitField.Flags.Administrator],
                        Position: 4
                });

                await interaction.guild.roles.create({
                    name: "Bots",
                    color: "#FFFFFF",
                    hoist: true,
                    permissions: [PermissionsBitField.Flags.Administrator],
                        Position: 5
                });

                await interaction.guild.roles.create({
                    name: "server manager",
                    color: "#FCE205",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.BanMembers,
                        PermissionsBitField.Flags.KickMembers,
                        PermissionsBitField.Flags.ViewAuditLog,
                        PermissionsBitField.Flags.ManageMessages,
                        PermissionsBitField.Flags.MuteMembers,
                        PermissionsBitField.Flags.DeafenMembers,
                        PermissionsBitField.Flags.ManageGuild,
                        PermissionsBitField.Flags.ManageChannels],
                        Position: 6
                });

                await interaction.guild.roles.create({
                    name: "perms",
                    color: "#a8a8a8",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.ManageRoles,
                        PermissionsBitField.Flags.BanMembers,
                        PermissionsBitField.Flags.ModerateMembers],
                        Position: 7
                });


                await interaction.guild.roles.create({
                    name: "senior-admin",
                    color: "#00ff28",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.BanMembers,
                        PermissionsBitField.Flags.KickMembers,
                        PermissionsBitField.Flags.ViewAuditLog,
                        PermissionsBitField.Flags.ManageMessages,
                        PermissionsBitField.Flags.MuteMembers,
                        PermissionsBitField.Flags.DeafenMembers],
                        Position: 8
                });


                await interaction.guild.roles.create({
                    name: "admin",
                    color: "#7f00ff",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.BanMembers,
                        PermissionsBitField.Flags.KickMembers,
                        PermissionsBitField.Flags.ViewAuditLog,
                        PermissionsBitField.Flags.ManageMessages,
                        PermissionsBitField.Flags.MuteMembers],
                        Position: 9
                });

                await interaction.guild.roles.create({
                    name: "junior admin",
                    color: "#9d4af0",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.BanMembers,
                        PermissionsBitField.Flags.KickMembers,
                        PermissionsBitField.Flags.ViewAuditLog,
                        PermissionsBitField.Flags.ManageMessages,
                        PermissionsBitField.Flags.MuteMembers],
                        Position: 10
                });

                
                await interaction.guild.roles.create({
                    name: "senior-moderator",
                    color: "#FCE205",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.ViewAuditLog,
                        PermissionsBitField.Flags.ManageMessages,
                        PermissionsBitField.Flags.MuteMembers,
                        PermissionsBitField.Flags.KickMembers],
                        Position: 11
                });

                await interaction.guild.roles.create({
                    name: "moderator",
                    color: "#FF8303",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.ViewAuditLog,
                        PermissionsBitField.Flags.ManageMessages,
                        PermissionsBitField.Flags.MuteMembers],
                        Position: 12
                });

                await interaction.guild.roles.create({
                    name: "staff",
                    color: "#1167b1",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.ManageMessages,
                        PermissionsBitField.Flags.ViewAuditLog,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.ViewChannel],
                        Position: 13
                });

                await interaction.guild.roles.create({
                    name: "trial staff",
                    color: "#6abd97",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.ViewAuditLog,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.ViewChannel],
                        Position: 14
                });

                await interaction.guild.roles.create({
                    name: "Giveaway-host",
                    color: "#010101",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.ManageMessages,
                        PermissionsBitField.Flags.ViewAuditLog,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.ViewChannel],
                        Position: 15
                });

                await interaction.guild.roles.create({
                    name: "VIP",
                    color: "#D4AF37",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.ViewChannel],
                        Position: 16
                });


                //color roles (6), ping roles(3), level roles(5-8)

                await interaction.guild.roles.create({
                    name: "red",
                    color: "#ff0000",
                    hoist: false,
                    Position: 17
                });

                await interaction.guild.roles.create({
                    name: "blue",
                    color: "#0065ff",
                    hoist: false,
                    Position: 18
                });

                await interaction.guild.roles.create({
                    name: "purple",
                    color: "#8d00ff",
                    hoist: false,
                    Position: 19
                });

                await interaction.guild.roles.create({
                    name: "orange",
                    color: "#ff8b00",
                    hoist: false,
                    Position: 20
                });

                await interaction.guild.roles.create({
                    name: "green",
                    color: "#00ff28",
                    hoist: false,
                    Position: 21
                });

                await interaction.guild.roles.create({
                    name: "pink",
                    color: "#ff94e0",
                    hoist: false,
                    Position: 22
                });

                await interaction.guild.roles.create({
                    name: "member",
                    color: "#1338BE",
                    hoist: true,
                    permissions: [
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory,
                        PermissionsBitField.Flags.ViewChannel],
                        Position: 23
                });

                //level roles

                await interaction.guild.roles.create({
                    name: "Level 30",
                    color: "#a8a8a8",
                    hoist: false,
                    Position: 24
                });

                await interaction.guild.roles.create({
                    name: "Level 25",
                    color: "#a8a8a8",
                    hoist: false,
                    Position: 25
                });

                await interaction.guild.roles.create({
                    name: "Level 20",
                    color: "#a8a8a8",
                    hoist: false,
                    Position: 26
                });

                await interaction.guild.roles.create({
                    name: "Level 15",
                    color: "#a8a8a8",
                    hoist: false,
                    Position: 27
                });

                await interaction.guild.roles.create({
                    name: "Level 10",
                    color: "#a8a8a8",
                    hoist: false,
                    Position: 28
                });

                await interaction.guild.roles.create({
                    name: "Level 5",
                    color: "#a8a8a8",
                    hoist: false,
                    Position: 29
                });

                //ping roles

                await interaction.guild.roles.create({
                    name: "announcement ping",
                    color: "#a8a8a8",
                    hoist: false,
                    Position: 30
                });

                await interaction.guild.roles.create({
                    name: "giveaway ping",
                    color: "#a8a8a8",
                    hoist: false,
                    Position: 31
                });

                await interaction.guild.roles.create({
                    name: "staff ping",
                    color: "#a8a8a8",
                    hoist: false,
                    Position: 32
                });

                await interaction.guild.roles.create({
                    name: "event ping",
                    color: "#a8a8a8",
                    hoist: false,
                    Position: 33
                }); //end of roles


                const servermanager = interaction.guild.roles.cache.find((r) => r.name === "server manager"); // to find roles
                const perms = interaction.guild.roles.cache.find((r) => r.name === "perms"); 
                const senioradmin = interaction.guild.roles.cache.find((r) => r.name === "senior-admin"); 
                const admin = interaction.guild.roles.cache.find((r) => r.name === "admin"); 
                const junioradmin = interaction.guild.roles.cache.find((r) => r.name === "junior admin"); 
                const seniormod = interaction.guild.roles.cache.find((r) => r.name === "senior-moderator"); 
                const mod = interaction.guild.roles.cache.find((r) => r.name === "moderator"); 
                const staff = interaction.guild.roles.cache.find((r) => r.name === "staff"); 
                const trialstaff = interaction.guild.roles.cache.find((r) => r.name === "trial staff");
                const givehost = interaction.guild.roles.cache.find((r) => r.name === "Giveaway-host"); // staff roles


                const vip = interaction.guild.roles.cache.find((r) => r.name === "VIP"); // color role


                const member = interaction.guild.roles.cache.find((r) => r.name === "member");



                const ids = [interaction.guild.roles.everyone.id, member.id, vip.id, givehost.id, trialstaff.id, staff.id, mod.id, seniormod.id, junioradmin.id]; const overwritesmute = [];
                for await (const id of ids) overwritesmute.push({ id: id, deny: [PermissionsBitField.Flags.SendMessages], allow: [PermissionsBitField.Flags.ViewChannel] });


                const ids1 = [admin.id, senioradmin.id, perms.id, servermanager.id]; const overwritesadmin = [];
                for await (const id of ids1) overwritesadmin.push({ id: id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] });


                const ids2 = [member.id, vip.id, interaction.guild.id]; const overwritesprivate = [];
                for await (const id of ids2) overwritesprivate.push({ id: id, deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] });



                const ids3 = [givehost.id, trialstaff.id, staff.id, mod.id, seniormod.id, junioradmin.id]; const overwritestaffmute = [];
                for await (const id of ids3) overwritestaffmute.push({ id: id, allow: [PermissionsBitField.Flags.ViewChannel], deny: [PermissionsBitField.Flags.SendMessages] });



                const ids4 = [givehost.id, trialstaff.id, staff.id, mod.id, seniormod.id, junioradmin.id]; const overwritestafftalk = [];
                for await (const id of ids4) overwritestafftalk.push({ id: id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]});

                
                const ids5 = [givehost.id, trialstaff.id, staff.id, mod.id, seniormod.id, junioradmin.id]; const overwritestaffhide = [];
                for await (const id of ids5) overwritestaffhide.push({ id: id, deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]});


                if (interaction.guild.channels.cache.size) {
                    for await (const [, channel] of interaction.guild.channels.cache) await channel.delete().catch(() => null);
                    }


                    const { guild } = interaction;
               const premiumcategory = await guild.channels.create({
                    type: ChannelType.GuildCategory,
                    name: "Infomation"
                });

                await guild.channels.create({
                    name: "moderation", // Channel Name
                    type: ChannelType.GuildText, // Channel Type
                    parent: premiumcategory, // Category ID
                    permissionOverwrites: [...overwritesadmin, ...overwritestaffhide, ...overwritesprivate]
                });


 

                await guild.channels.create({
                    name: "🙌・welcome", // Channel Name
                    type: ChannelType.GuildText, // Channel Type
                    parent: premiumcategory, // Category ID
                    permissionOverwrites: [...overwritesmute, ...overwritesadmin]
                });

                await guild.channels.create({
                    name: "📚・rules", // Channel Name
                    type: ChannelType.GuildText, // Channel Type
                    parent: premiumcategory, // Category ID
                    permissionOverwrites: [...overwritesmute, ...overwritesadmin]
                });

                const channel = interaction.guild.channels.cache.find((channel) => channel.name.includes("rules")); // when reusing this line change the variable (channel) change to like (channel2) (used to find channels)

                    const premiumrules = new EmbedBuilder()
                        .setTitle("Rules")
                        .setColor('DarkGold')
                        .addFields({ name: "**Discord Server Rules**", value: "**When joining the server all rules are agreed to!**" })
                        .addFields({ name: "• 1) __Discord ToS and Guidelines__", value: "All users need to follow Discord's Terms of Service and Community Guidelines." })
                        .addFields({ name: "• 2) __Advertising__", value: "No user should post ads, In members DM's of within the server its self, If you wish to partner Ask the owner." })
                        .addFields({ name: "• 3) __Scamming__", value: "No user will scam or attempt to scam members/staff for Real items or online items." })
                        .addFields({ name: "• 4) __Racist language__", value: "Any racial slurs or racist behaviour/comments are NOT accepted in this server. This will be an instant Ban." })
                        .addFields({ name: "• 5) __Respect__", value: "Respecting the admin and mod team is really important. The moderation team has the final say." })
                        .addFields({ name: "• 6) __NSFW__", value: "There will be 0 NSFW images, videos or text, breaking this rule is an instant and permanent ban." })
                        .addFields({ name: "• 7) __Selling__", value: "There will be no selling online itmes for REAL currency." })
                        .addFields({ name: "• 8) __No staff impersonation__", value: "Do not attempt to Impersonate staff members." })
                        .addFields({ name: "• 9) __Loopholes__", value: "Do not attempt to bypass any rules with loopholes within the rules, if there are loopholes being exploited users will be punished for using it, Please report any found loopholes." })
                        .addFields({ name: "• 10) __Server raiding__", value: "Do not try to set up and attempt to raid this server or any server." })
                        .addFields({ name: " __**Warnings**__", value: "minor offences will result in a warn." });

                    channel.send({ embeds: [premiumrules] });
                

                    await guild.channels.create({
                        name: "📢・announcements", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory, // Category ID
                        permissionOverwrites: overwritesmute, ...overwritesadmin
                    });

                    await guild.channels.create({
                        name: "💎・boosts", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory, // Category ID
                        permissionOverwrites: overwritesmute, ...overwritesadmin
                    });

                    await guild.channels.create({
                        name: "🍀・pings", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory, // Category ID
                        permissionOverwrites: overwritesmute
                    });

                    await guild.channels.create({
                        name: "🎨・colors", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory, // Category ID
                        permissionOverwrites: overwritesmute
                    });

                    await guild.channels.create({
                        name: "⚠・report", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory, // Category ID
                        permissionOverwrites: overwritesmute
                    });


                    const premiumcategory2 = await guild.channels.create({
                        type: ChannelType.GuildCategory,
                        name: "social"
                    });


                    await guild.channels.create({
                        name: "💬・main-chat", // Channel Name
                        type: ChannelType.GuildText, // Channel Type 🙌・welcome
                        parent: premiumcategory2, // Category ID
                        
                    });

                    await guild.channels.create({
                        name: "🤡・memes", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory2, // Category ID 
                    });

                    await guild.channels.create({
                        name: "🤖・commands", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory2 // Category ID
                    });

                    await guild.channels.create({
                        name: "📷・media", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory2 // Category ID
                    });

                    await guild.channels.create({
                        name: "🥇・rank-up", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory2, // Category ID
                        permissionOverwrites: overwritesmute
                    });


                    const premiumcategory3 = await guild.channels.create({
                        type: ChannelType.GuildCategory,
                        name: "Events"
                    });

                    await guild.channels.create({
                        name: "🎪・events-announcement", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory3, // Category ID 
                        permissionOverwrites: overwritesmute
                    });

                    await guild.channels.create({
                        name: "minigames", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory3, // Category ID 
                        permissionOverwrites: overwritesmute
                    });

                    const premiumcategory4 = await guild.channels.create({
                        type: ChannelType.GuildCategory,
                        name: "GIVEAWAYS"
                    });

                    await guild.channels.create({
                        name: "🎉╭・big-giveaways", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory4, // Category ID 
                        permissionOverwrites: [
                            {
                                id: givehost,
                                allow: [PermissionsBitField.Flags.SendMessages]
                            },
                            ...overwritesmute],
                            
                    });


                    await guild.channels.create({
                        name: "🎉┃giveaways", // Channel Name🥳╰・open-invites
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory4, // Category ID 
                        permissionOverwrites: [
                            {
                                id: givehost,
                                allow: [PermissionsBitField.Flags.SendMessages]
                            },
                            ...overwritesmute],
                            
                    });


                    await guild.channels.create({
                        name: "🥳╰・flash-giveaways", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory4, // Category ID 
                        permissionOverwrites: [
                            {
                                id: givehost,
                                allow: [PermissionsBitField.Flags.SendMessages]
                            },
                            ...overwritesmute],
                            
                    });


                    const premiumcategory5 = await guild.channels.create({
                        type: ChannelType.GuildCategory,
                        name: "Tickets"
                    });

                    await guild.channels.create({
                        name: "📩╭・tickets", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory5, // Category ID 
                        permissionOverwrites: overwritesmute
                    });

                    await guild.channels.create({
                        name: "📢┃staff-tickets", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory5, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritesmute, ...overwritesadmin],
                            
                        
                    });

                    await guild.channels.create({
                        name: "📨╰・giveaway-tickets", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory5, // Category ID 
                        permissionOverwrites: overwritesmute
                    });


                    const premiumcategory6 = await guild.channels.create({
                        type: ChannelType.GuildCategory,
                        name: "STAFF"
                    });

                    await guild.channels.create({
                        name: "📣╭・announcements", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory6, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestaffmute, ...overwritesadmin]
                    });

                    await guild.channels.create({
                        name: "📣╭・Promotions", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory6, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestaffmute, ...overwritesadmin]
                    });

                    await guild.channels.create({
                        name: "📜┃・staff-rules", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory6, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestaffmute, ...overwritesadmin]
                    });


                    //staff rules embed
                    const channel3 = interaction.guild.channels.cache.find((channel) => channel.name.includes("staff-rules")); // when reusing this line change the variable (channel) change to like (channel2) (used to find channels)

                    const staffrules = new EmbedBuilder()
                    .setTitle('Staff Rules')
                    .setColor('Random')
                    .addFields({ name: "**Staff team rules**", value: "**When joining the staff team, all rules are agreed to!**" })
                    .addFields({ name: "• 1) __Discord ToS and Guidelines__", value: "As staff members you represent the server and its values, so you must uphold the rules!." })
                    .addFields({ name: "• 2) __Respect__", value: "You must still be respectful towards the community and other staff members." })
                    .addFields({ name: "• 3) __Decisions__", value: "Although your a staff member you must still listen to higher-ups, they have the final call." })
                    .addFields({ name: "• 4) __Decision making__", value: "As a staff team member its your responsibility to make quick and fair decisions." })
                    .addFields({ name: "• 5) __Advertising__", value: "Do not advertise other servers without permission from higher staff." })
                    .addFields({ name: "• 6) __fighting__", value: "Do not start fight between one another or between members for the fun of it." })
                    .addFields({ name: "• 7) __Begging__", value: "Don't beg high staff for things." })

                    channel3.send({ embeds: [staffrules] });


                    await guild.channels.create({
                        name: "🎀┃・staff-chat", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory6, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestafftalk, ...overwritesadmin]
                    });

                    await guild.channels.create({
                        name: "💼┃・staff-commands", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory6, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestafftalk, ...overwritesadmin]
                    });

                    await guild.channels.create({
                        name: "🔒╰・admin-chat", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory6, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestaffhide, ...overwritesadmin]
                    });

                    await guild.channels.create({
                        name: "staff-vc", // Channel Name
                        type: ChannelType.GuildVoice, // Channel Type
                        parent: premiumcategory6, // Category ID 
                        permissionOverwrites: [...overwritesprivate]
                    });


                    const premiumcategory7 = await guild.channels.create({
                        type: ChannelType.GuildCategory,
                        name: "LOGS"
                    });

                    await guild.channels.create({
                        name: "💼┃messages", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory7, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestaffhide, ...overwritesadmin]
                    });

                    await guild.channels.create({
                        name: "💼┃modlogs", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory7, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestaffhide, ...overwritesadmin]
                    });

                    await guild.channels.create({
                        name: "💼┃security-logs", // Channel Nameserver-log
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory7, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestaffhide, ...overwritesadmin]
                    });

                    await guild.channels.create({
                        name: "💼┃server-log", // Channel Name
                        type: ChannelType.GuildText, // Channel Type
                        parent: premiumcategory7, // Category ID 
                        permissionOverwrites: [...overwritesprivate, ...overwritestaffhide, ...overwritesadmin]
                    });

                     //set-up complete embed

                const premiumcomplate = interaction.guild.channels.cache.find((channel) => channel.name.includes("server-log"));

                const premiumdone = new EmbedBuilder()
                    .setTitle("Set-up Completed")
                    .setColor('Gold')
                    .setDescription("your premium server has been set-up with bloom, enjoy your server!")
                    .setTimestamp()
                    .setFooter({ text: "you can delete this embed" });

                    premiumcomplate.send({ embeds: [premiumdone] });




                    
            })
            break;
        }; //end line for premium collector
    }
}}