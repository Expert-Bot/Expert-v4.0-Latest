const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const st = require('../../settings.js').bot;
const { ownerIDS } = require('../../owner.json');

module.exports = {
  name: 'antinuke',
  aliases: ['antiwizz', 'an'],
  category: 'security',
  run: async (client, message, args) => {
    let prefix = await client.db8.get(`${message.guild.id}_prefix`);
    if (!prefix) prefix = st.info.prefix;
    arypton = await client.users.fetch(`560115112078475266`); //arypton
    let antiwizz = []
    let antiwizzz = []
    const isActivatedAlready = await client.db.get(`${message.guild.id}_antinuke`);
    const kickpunish = await client.db.get(`${message.guild.id}_antinuke_kick`);
    const banpunish = await client.db.get(`${message.guild.id}_antinuke_ban`);
    const user = client.users.cache.get(args[2]) || message.mentions.members.first() || message.author;
    const role = message.mentions.roles.first() ||  message.guild.roles.cache.get(args[2]) || message.author;
    const users = [];
    const ID = user.id;
    const data2 = client.db.get(`${message.guild.id}_wl`);
    const rolewhitelisted = await client.db.get(`${message.guild.id}_wl_role_${role.id}`);
    const antiban = await client.db.get(`${message.guild.id}_antiban`);
    const antikick = await client.db.get(`${message.guild.id}_antikick`);
    const antibot = await client.db.get(`${message.guild.id}_antibot`);
    const antiunban = await client.db.get(`${message.guild.id}_antiunban`);
    const antiguildup = await client.db.get(`${message.guild.id}_antiguildupdate`);
    const antimemberup = await client.db.get(`${message.guild.id}_antimemberupdate`);
    const antichannelcreate = await client.db.get(`${message.guild.id}_antichannelcreate`);
    const antichanneldelete = await client.db.get(`${message.guild.id}_antichanneldelete`);
    const antichannelupdate = await client.db.get(`${message.guild.id}_antichannelupdate`);
    const antirolecreate = await client.db.get(`${message.guild.id}_antirolecreate`);
    const antiroledelete = await client.db.get(`${message.guild.id}_antiroledelete`);
    const antiroleupdate = await client.db.get(`${message.guild.id}_antiroleupdate`);
    const antiwebhookcreate = await client.db.get(`${message.guild.id}_antiwebhookcreate`);
    const antiwebhookdelete = await client.db.get(`${message.guild.id}_antiwebhookdelete`);
    const antiwebhookupdate = await client.db.get(`${message.guild.id}_antiwebhookupdate`);
    const antiemojicreate = await client.db.get(`${message.guild.id}_antiemojicreate`);
    const antiemojidelete = await client.db.get(`${message.guild.id}_antiemojidelete`);
    const antiemojiupdate = await client.db.get(`${message.guild.id}_antiemojiupdate`);
    const antistickercreate = await client.db.get(`${message.guild.id}_antistickercreate`);
    const antistickerdelete = await client.db.get(`${message.guild.id}_antistickerdelete`);
    const antistickerupdate = await client.db.get(`${message.guild.id}_antistickerupdate`);
    const antiprune = await client.db.get(`${message.guild.id}_antiprune`);
    const autorecovery = await client.db.get(`${message.guild.id}_autorecovery`);

    if (antiban) {
      antiwizz.push(`**Anti Ban** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antiban) {
      antiwizz.push(`**Anti Ban** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antikick) {
      antiwizz.push(`**Anti Kick** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antikick) {
      antiwizz.push(`**Anti Kick** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antibot) {
      antiwizz.push(`**Anti Bot** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antibot) {
      antiwizz.push(`**Anti Bot** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antiunban) {
      antiwizz.push(`**Anti Unban** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antiunban) {
      antiwizz.push(`**Anti Unban** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antiguildup) {
      antiwizz.push(`**Anti Guild Update** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antiguildup) {
      antiwizz.push(`**Anti Guild Update** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antimemberup) {
      antiwizz.push(`**Anti Member Update** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antimemberup) {
      antiwizz.push(`**Anti Member Update** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antichannelcreate) {
      antiwizz.push(`**Anti Channel Create** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antichannelcreate) {
      antiwizz.push(`**Anti Channel Create** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antichanneldelete) {
      antiwizz.push(`**Anti Channel Delete** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antichanneldelete) {
      antiwizz.push(`**Anti Channel Delete** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antichannelupdate) {
      antiwizz.push(`**Anti Channel Update** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antichannelupdate) {
      antiwizz.push(`**Anti Channel Update** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antirolecreate) {
      antiwizz.push(`**Anti Role Create** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antirolecreate) {
      antiwizz.push(`**Anti Role Create** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antiroledelete) {
      antiwizz.push(`**Anti Role Delete** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antiroledelete) {
      antiwizz.push(`**Anti Role Delete** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antiroleupdate) {
      antiwizz.push(`**Anti Role Update** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antiroleupdate) {
      antiwizz.push(`**Anti Role Update** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antiwebhookcreate) {
      antiwizz.push(`**Anti Webhook Create** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antiwebhookcreate) {
      antiwizz.push(`**Anti Webhook Create** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antiwebhookdelete) {
      antiwizz.push(`**Anti Webhook Delete** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antiwebhookdelete) {
      antiwizz.push(`**Anti Webhook Delete** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antiwebhookupdate) {
      antiwizz.push(`**Anti Webhook Update** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antiwebhookupdate) {
      antiwizz.push(`**Anti Webhook Update** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antiemojicreate) {
      antiwizz.push(`**Anti Emoji Create** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antiemojicreate) {
      antiwizz.push(`**Anti Emoji Create** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antiemojidelete) {
      antiwizz.push(`**Anti Emoji Delete** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antiemojidelete) {
      antiwizz.push(`**Anti Emoji Delete** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antiemojiupdate) {
      antiwizz.push(`**Anti Emoji Update** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antiemojiupdate) {
      antiwizz.push(`**Anti Emoji Update** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antistickercreate) {
      antiwizz.push(`**Anti Sticker Create** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antistickercreate) {
      antiwizz.push(`**Anti Sticker Create** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antistickerdelete) {
      antiwizz.push(`**Anti Sticker Delete** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antistickerdelete) {
      antiwizz.push(`**Anti Sticker Delete** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antistickerupdate) {
      antiwizz.push(`**Anti Sticker Update** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antistickerupdate) {
      antiwizz.push(`**Anti Sticker Update** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (antiprune) {
      antiwizzz.push(`**Anti Prune** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!antiprune) {
      antiwizzz.push(`**Anti Prune** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }

    if (autorecovery) {
      antiwizzz.push(`**Auto Recovery** <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`)
    }

    if (!autorecovery) {
      antiwizzz.push(`**Auto Recovery** <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`)
    }
      
      const wlshowembed = new MessageEmbed()
    .setColor("#2f3136")
    .setDescription(`Select the options given to whitelist <@${user.id}>`);

    const pagg = new MessageActionRow().addComponents(
            new MessageButton().setStyle(`PRIMARY`).setCustomId(`lol1`).setLabel(`Whitelist the user from all events`)
      );

  const menuOptions = new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setCustomId('AntinukeWlChoice')
      .setPlaceholder('Select the Events to whitelist...')
      .setMinValues(1)
      .setMaxValues(21)
      .addOptions([
        {
          label: `Antiban`,
          desciption: `Whitelist user from Antiban`,
          value: `w1`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antikick`,
          desciption: `Whitelist user from Antikick`,
          value: `w2`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antibot`,
          desciption: `Whitelist user from Antibot`,
          value: `w3`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antiunban`,
          desciption: `Whitelist user from Antiunban`,
          value: `w4`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antiguild Update`,
          desciption: `Whitelist user from Antiguild Update`,
          value: `w5`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antimember Update`,
          desciption: `Whitelist user from Antimember Update`,
          value: `w6`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antirole Create`,
          desciption: `Whitelist user from Antirole Create`,
          value: `w7`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antirole Delete`,
          desciption: `Whitelist user from Antirole Delete`,
          value: `w8`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antirole Update`,
          desciption: `Whitelist user from Antirole Update`,
          value: `w9`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antichannel Create`,
          desciption: `Whitelist user from Antichannel Create`,
          value: `w10`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antichannel Delete`,
          desciption: `Whitelist user from Antichannel Delete`,
          value: `w11`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antichannel Update`,
          desciption: `Whitelist user from Antichannel Update`,
          value: `w12`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antiwebhook Create`,
          desciption: `Whitelist user from Antiwebhook Create`,
          value: `w13`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antiwebhook Delete`,
          desciption: `Whitelist user from Antiwebhook Delete`,
          value: `w14`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antiwebhook Update`,
          desciption: `Whitelist user from Antiwebhook Update`,
          value: `w15`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antiemoji Create`,
          desciption: `Whitelist user from Antiemoji Create`,
          value: `w16`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antiemoji Delete`,
          desciption: `Whitelist user from Antiemoji Delete`,
          value: `w17`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antiemoji Update`,
          desciption: `Whitelist user from Antiemoji Update`,
          value: `w18`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antisticker Create`,
          desciption: `Whitelist user from Antisticker Create`,
          value: `w19`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antisticker Delete`,
          desciption: `Whitelist user from Antisticker Delete`,
          value: `w20`,
          emoji: `1061549387043573802`
        },
        {
          label: `Antisticker Update`,
          desciption: `Whitelist user from Antisticker Update`,
          value: `w21`,
          emoji: `1061549387043573802`
        }
      ])
    )

    const mentionsomeone = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Mention Someone First`);

    const eeeee = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Antinuke.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke disable`);

    const eeee = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully enabled Antinuke settings.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke disable`);

    const ddddd = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Antinuke.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke enable`);

    const dddd = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Antinuke settings.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke enable`);

    const raja = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Only Server Owner can perform this command.`)
      .setFooter("Add me to your server to use me ;)")

    const features = new MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`・Need Help? Join [Support Server](https://dsc.gg/rapidhq)\n\n**Antinuke Features**
> <a:arrows:1050760970122821642> Anti Ban
> <a:arrows:1050760970122821642> Anti Kick
> <a:arrows:1050760970122821642> Anti Bot
> <a:arrows:1050760970122821642> Anti Unban
> <a:arrows:1050760970122821642> Anti Guild Update
> <a:arrows:1050760970122821642> Anti Member Update
> <a:arrows:1050760970122821642> Anti Role Create
> <a:arrows:1050760970122821642> Anti Role Delete
> <a:arrows:1050760970122821642> Anti Role Update
> <a:arrows:1050760970122821642> Anti Channel Create
> <a:arrows:1050760970122821642> Anti Channel Delete
> <a:arrows:1050760970122821642> Anti Channel Update
> <a:arrows:1050760970122821642> Anti Webhook Create
> <a:arrows:1050760970122821642> Anti Webhook Delete
> <a:arrows:1050760970122821642> Anti Webhook Update
> <a:arrows:1050760970122821642> Anti Emoji Create
> <a:arrows:1050760970122821642> Anti Emoji Delete
> <a:arrows:1050760970122821642> Anti Emoji Update
> <a:arrows:1050760970122821642> Anti Sticker Create
> <a:arrows:1050760970122821642> Anti Sticker Delete
> <a:arrows:1050760970122821642> Anti Sticker Update
> <a:arrows:1050760970122821642> Anti Prune
> <a:arrows:1050760970122821642> Auto Recovery`)
      .addField(`LINKS`, `• Join the [support server](https://dsc.gg/rapidhq) if you need help`, false)
      .setFooter(`Made by ${client.guilds.cache.get(`968742392507293756`).name} with 💞`, `${client.guilds.cache.get(`968742392507293756`).iconURL({ dynamic: true })}`);

    const guide = new MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setImage('https://media.discordapp.net/attachments/1054069059240591461/1057265219564482581/standard_1.gif')
      .setDescription(`・Need Help? Join [Support Server](https://dsc.gg/rapidhq)
      
**Antinuke Toggle**
\`\`\`
> [01] | ${prefix}antinuke enable | disable
> [02] | ${prefix}antinuke antiban enable | disable
> [03] | ${prefix}antinuke antikick enable | disable
> [04] | ${prefix}antinuke antibot enable | disable
> [05] | ${prefix}antinuke antiunban enable | disable
> [06] | ${prefix}antinuke antiguild update enable | disable
> [07] | ${prefix}antinuke antimember update enable | disable
> [08] | ${prefix}antinuke antirole create enable | disable
> [09] | ${prefix}antinuke antirole delete enable | disable
> [10] | ${prefix}antinuke antirole update enable | disable
> [11] | ${prefix}antinuke antichannel create enable | disable
> [12] | ${prefix}antinuke antichannel delete enable | disable
> [13] | ${prefix}antinuke antichannel update enable | disable
> [14] | ${prefix}antinuke antiwebhook create enable | disable
> [15] | ${prefix}antinuke antiwebhook delete enable | disable
> [16] | ${prefix}antinuke antiwebhook update enable | disable
> [17] | ${prefix}antinuke antiemoji create enable | disable
> [18] | ${prefix}antinuke antiemoji delete enable | disable
> [19] | ${prefix}antinuke antiemoji update enable | disable
> [20] | ${prefix}antinuke antisticker create enable | disable
> [21] | ${prefix}antinuke antisticker delete enable | disable
> [22] | ${prefix}antinuke antisticker update enable | disable
> [23] | ${prefix}antinuke antiprune enable | disable
> [24] | ${prefix}antinuke autorecovery enable | disable
> [25] | ${prefix}antinuke reset
> [26] | ${prefix}antinuke features
\`\`\``)
      .addField(`Whitelist Toggle`, `\`\`\`
> [27] | ${prefix}antinuke whitelist add <user>
> [28] | ${prefix}antinuke whitelist remove <user>
> [29] | ${prefix}antinuke whitelist show
> [30] | ${prefix}antinuke whitelist reset
\`\`\``)
      .addField(`LINKS`, `• Join the [Support Server](https://dsc.gg/rapidhq) if you need help`, false)
      .setFooter(`Made by ${client.guilds.cache.get(`968742392507293756`).name} with 💞`, `${client.guilds.cache.get(`968742392507293756`).iconURL({ dynamic: true })}`);

    const settingss = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`**Antinuke Events Settings**\n\n${antiwizz.join("\n")}\n\n\n${antiwizzz.join("\n")}`)
      .addFields({
        name: `Other Settings`, value: `To turn off/on any event type ${prefix}antinuke help
Available Punishment for this is ban and it is fixed make sure to whitelist your trusted one's :)`})
      .setFooter(`Made by ${client.guilds.cache.get(`968742392507293756`).name} with 💞`, `${client.guilds.cache.get(`968742392507293756`).iconURL({ dynamic: true })}`);

    const alkick = new MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Punishment is already **Kick**`);

    const alban = new MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Punishment is already **Ban**`);

    const setkick = new MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Punishment is set to **Kick**`);

    const setban = new MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Punishment is set to **Ban**`);

    const wlistguide = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Select the options given to whitelist <@${ID}>`);

    const wlist = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`<@${ID}> was successfully added in Whitelisted users`);

    const remwlist = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`<@${ID}> was successfully removed from Whitelisted users`);

    const alwlist = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`<@${ID}> is already added Whitelisted users`);

    const nowlist = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`<@${ID}> Yet not added in Whitelisted users`);

    /////////////////////////////////////// 

    const rolewllimit = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Role Whitelist Limit is 1 and you trying to surpass it without premium`);

    const rolewlistguide = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Select the options given to whitelist <@&${role.id}>`);

    const rolewlist = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`<@&${role.id}> was successfully added in Whitelisted roles`);

    const roleremwlist = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`<@&${role.id}> was successfully removed from Whitelisted roles`);

    const rolealwlist = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`<@&${role.id}> is already added Whitelisted roles`);

    const rolenowlist = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`<@&${role.id}> Yet not added in Whitelisted roles`);

    const noone = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`No one is whitelisted`);

    const remall = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Removed everyone from whitelist`); 

    const whynoone = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`There are no whitelisted users in this server`);

    const guide2 = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`${prefix}antinuke whitelist add <user>\nAdd a user to whitelisted users in the server.\n\n${prefix}antinuke whitelist remove <user>\nShows list of whitelisted users in the server.\n\n${prefix}antinuke whitelist show\nRemoves a user from whitelisted users in the server.\n\n${prefix}antinuke whitelist reset\nRemoves all the users from whitelisted users in the server.`)
      .setFooter(`Made by ${client.guilds.cache.get(`968742392507293756`).name} with 💞`, `${client.guilds.cache.get(`968742392507293756`).iconURL({ dynamic: true })}`);

    const antibanalreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Ban.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiban disable`);

    const antibanon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Ban.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiban disable`);

    const antibanalreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Ban.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiban enable`);

    const antibanoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Ban.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiban enable`);

    const antikickalreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Kick.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antikick disable`);

    const antikickon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Kick.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antikick disable`);

    const antikickalreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Kick.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antikick enable`);

    const antikickoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Kick.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antikick enable`);

    const antibotalreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Bot.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antibot disable`);

    const antiboton = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setAuthor({ name: 'Rapid Security', iconURL: 'https://cdn.discordapp.com/avatars/1002306671261003948/1c9d936195dd203d6a63bc2227185c4d.webp?size=2048' })
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Bot.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antibot disable`);

    const antibotalreadyoff = new MessageEmbed() //antiunban
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Bot.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antibot enable`);

    const antibotoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Bot.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antibot enable`);

    const antiunbanalreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Unban.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiunban disable`);

    const antiunbanon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Unban.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiunban disable`);

    const antiunbanalreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Unban.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiunban enable`);

    const antiunbanoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Unban.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiunban enable`);

    const antiguildupalreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Guild Update.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiguild update disable`);

    const antiguildupon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Guild Update.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiguild update disable`);

    const antiguildupalreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Guild Update.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiguild update enable`);

    const antiguildupoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Guild Update.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiguild update enable`);

    const antimemberupalreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Member Update.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antimember update disable`);

    const antimemberupon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Member Update.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antimember update disable`);

    const antimemberupalreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Member Update.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antimember update enable`);

    const antimemberupoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Member Update.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antimember update enable`);

    const antichannelcreatealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Channel Create.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antichannel create disable`);

    const antichannelcreateon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Channel Create.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antichannel create disable`);

    const antichannelcreatealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Channel Create.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antichannel create enable`);

    const antichannelcreateoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Channel Create.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antichannel create enable`);

    const antichanneldeletealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Channel Delete.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antichannel delete disable`);

    const antichanneldeleteon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Channel Delete.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antichannel delete disable`);

    const antichanneldeletealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Channel Delete.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antichannel delete enable`);

    const antichanneldeleteoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Channel Delete.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antichannel delete enable`);

    const antichannelupdatealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Channel Update.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antichannel update disable`);

    const antichannelupdateon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Channel Update.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antichannel update disable`);

    const antichannelupdatealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Channel Update.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antichannel update enable`);

    const antichannelupdateoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Channel Update.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antichannel update enable`);

    const antirolecreatealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Role Create.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antirole create disable`);

    const antirolecreateon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Role Create.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antirole create disable`);

    const antirolecreatealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Role Create.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antirole create enable`);

    const antirolecreateoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Role Create.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antirole create enable`);

    const antiroledeletealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Role Delete.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antirole delete disable`);

    const antiroledeleteon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Role Delete.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antirole delete disable`);

    const antiroledeletealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Role Delete.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antirole delete enable`);

    const antiroledeleteoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Role Delete.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antirole delete enable`);

    const antiroleupdatealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Role Update.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antirole update disable`);

    const antiroleupdateon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Role Update.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antirole update disable`);

    const antiroleupdatealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Role Update.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antirole update enable`);

    const antiroleupdateoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Role Update.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antirole update enable`);

    const antiwebhookcreatealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Webhook Create.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiwebhook create disable`);

    const antiwebhookcreateon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Webhook Create.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiwebhook create disable`);

    const antiwebhookcreatealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Webhook Create.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiwebhook create enable`);

    const antiwebhookcreateoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Webhook Create.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiwebhook create enable`);

    const antiwebhookdeletealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Webhook Delete.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiwebhook delete disable`);

    const antiwebhookdeleteon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Webhook Delete.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiwebhook delete disable`);

    const antiwebhookdeletealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Webhook Delete.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiwebhook delete enable`);

    const antiwebhookdeleteoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Webhook Delete.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiwebhook delete enable`);

    const antiwebhookupdatealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Webhook Update.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiwebhook update disable`);

    const antiwebhookupdateon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Webhook Update.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiwebhook update disable`);

    const antiwebhookupdatealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Webhook Update.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiwebhook update enable`);

    const antiwebhookupdateoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Webhook Update.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiwebhook update enable`);

    const antiemojicreatealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Emoji Create.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiemoji create disable`);

    const antiemojicreateon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Emoji Create.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiemoji create disable`);

    const antiemojicreatealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Emoji Create.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiemoji create enable`);

    const antiemojicreateoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Emoji Create.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiemoji create enable`);

    const antiemojideletealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Emoji Delete.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiemoji delete disable`);

    const antiemojideleteon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Emoji Delete.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiemoji delete disable`);

    const antiemojideletealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Emoji Delete.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiemoji delete enable`);

    const antiemojideleteoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Emoji Delete.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiemoji delete enable`);

    const antiemojiupdatealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Emoji Update.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiemoji update disable`);

    const antiemojiupdateon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Emoji Update.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiemoji update disable`);

    const antiemojiupdatealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Emoji Update.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiemoji update enable`);

    const antiemojiupdateoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Emoji Update.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiemoji update enable`);

    const antistickercreatealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Sticker Create.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antisticker create disable`);

    const antistickercreateon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Sticker Create.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antisticker create disable`);

    const antistickercreatealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Sticker Create.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antisticker create enable`);

    const antistickercreateoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti v Create.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antisticker create enable`);

    const antistickerdeletealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Sticker Delete.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antisticker delete disable`);

    const antistickerdeleteon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Sticker Delete.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antisticker delete disable`);

    const antistickerdeletealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Sticker Delete.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antisticker delete enable`);

    const antistickerdeleteoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Sticker Delete.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antisticker delete enable`);

    const antistickerupdatealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Sticker Update.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antisticker update disable`);

    const antistickerupdateon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Sticker Update.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antisticker update disable`);

    const antistickerupdatealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Sticker Update.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antisticker update enable`);

    const antistickerupdateoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Sticker Update.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antisticker update enable`);

    const antiprunealreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Anti Prune.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiprune disable`);

    const antipruneon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Anti Prune.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke antiprune disable`);

    const antiprunealreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Anti Prune.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiprune enable`);

    const antipruneoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Anti Prune.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke antiprune enable`);

    const autorecoveryalreadyon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already enabled Auto Recovery.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke autorecovery disable`);

    const autorecoveryon = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully Enabled Auto Recovery.
      Current Status : <:topggDotBlue:1195079715447394495>
<:ET_enabled:1020380165412499559>`})
      .setFooter(`To disable it use ${prefix}antinuke autorecovery disable`);

    const autorecoveryalreadyoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Ohh uh! looks like your server has already disabled Auto Recovery.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke autorecovery enable`);

    const autorecoveryoff = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({
        name: `Security Settings`, value: `Successfully disabled Auto Recovery.
      Current Status : <:ET_disabled:1020380187612950559><:topggDotBlue:1195079715447394495>
`})
      .setFooter(`To enable it use ${prefix}antinuke autorecovery enable`);

    const onkrle = new MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Enable Antinuke First to use this Command.`);

    const punishwlistguide = new MessageEmbed()
    .setColor('#2f3136')
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription(`Choose a Punishment Below`);

    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Vote Me")
        .setStyle("LINK")
        .setURL(`https://top.gg/bot/${client.user.id}?s=0ae05abf3185d`)
    )

    const button2 = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Invite Me")
        .setStyle("LINK")
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
    )
      
    const r3 = new MessageActionRow().addComponents(
            new MessageButton().setStyle(`SECONDARY`).setCustomId(`bannn`).setLabel(`Ban`),
            new MessageButton().setStyle(`SECONDARY`).setCustomId(`kickkk`).setLabel(`Kick`)
        );
      
    const r2 = new MessageActionRow().addComponents(
            new MessageButton().setStyle(`SUCCESS`).setCustomId(`addd`).setLabel(`Add`),
            new MessageButton().setStyle(`DANGER`).setCustomId(`remm`).setLabel(`Remove`)
        );
      
    const pag = new MessageActionRow().addComponents(
            new MessageButton().setStyle(`PRIMARY`).setCustomId(`lol1`).setLabel(`≪`),
            new MessageButton().setStyle(`SUCCESS`).setCustomId(`lol2`).setLabel(`Back`),
            new MessageButton().setStyle(`DANGER`).setCustomId(`lol3`).setEmoji(`1003992348205777036`),
            new MessageButton().setStyle(`SUCCESS`).setCustomId(`lol4`).setLabel(`Next`),
            new MessageButton().setStyle(`PRIMARY`).setCustomId(`lol5`).setLabel(`≫`)
        );

    const antiguidepg1 = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(`Antinuke (35)`, client.user.displayAvatarURL())
      .setDescription(`\`${prefix}antinuke\`
Helps To Toggle Antinuke

\`${prefix}antinuke guide\`
Gives you Antinuke Help Menu Just Like This.

\`${prefix}antinuke enable\`
Enables the security system for the server.

\`${prefix}antinuke disable\`
Disables the security system for the server.

\`${prefix}antinuke config\`
Shows you details about the security settings.

\`${prefix}antinuke punishment [punish=None]\`
Changes the punishment type for punishments.

\`${prefix}antinuke antiban enable/disable\`
Toggles Anti Ban.

\`${prefix}antinuke antikick enable/disable\`
Toggles Anti Kick.

\`${prefix}antinuke antibot enable/disable\`
Toggles Anti Bot.

\`${prefix}antinuke antiunban enable/disable\`
Toggles Anti Unban.`)
    .setFooter(`${client.user.username} • Page 1/4`, client.user.displayAvatarURL())

    const antiguidepg2 = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(`Antinuke (35)`, client.user.displayAvatarURL())
      .setDescription(`\`${prefix}antinuke antiguild update enable/disable\`
Toggles Anti Guild Update.

\`${prefix}antinuke antimember update enable/disable\`
Toggles Anti Member Update.
  
\`${prefix}antinuke antirole create enable/disable\`
Toggles Anti Role Create.

\`${prefix}antinuke antirole delete enable/disable\`
Toggles Anti Role Delete.

\`${prefix}antinuke antirole update enable/disable\`
Toggles Anti Role Update.

\`${prefix}antinuke antichannel create enable/disable\`
Toggles Anti Channel Create.

\`${prefix}antinuke antichannel delete enable/disable\`
Toggles Anti Channel Delete.

\`${prefix}antinuke antichannel update enable/disable\`
Toggles Anti Channel Update.

\`${prefix}antinuke antiwebhook create enable/disable\`
Toggles Anti Webhook Create.

\`${prefix}antinuke antiwebhook delete enable/disable\`
Toggles Anti Webhook Delete.`)
    .setFooter(`${client.user.username} • Page 2/4`, client.user.displayAvatarURL())

    const antiguidepg3 = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(`Antinuke (35)`, client.user.displayAvatarURL())
     .setDescription(`\`${prefix}antinuke antiwebhook update enable/disable\`
Toggles Anti Webhook Update.

\`${prefix}antinuke antiemoji create enable/disable\`
Toggles Anti Emoji Create.

\`${prefix}antinuke antiemoji delete enable/disable\`
Toggles Anti Emoji Delete.

\`${prefix}antinuke antiemoji update enable/disable\`
Toggles Anti Emoji Update.

\`${prefix}antinuke antisticker create enable/disable\`
Toggles Anti Sticker Create.

\`${prefix}antinuke antisticker delete enable/disable\`
Toggles Anti Sticker Delete.

\`${prefix}antinuke antisticker update enable/disable\`
Toggles Anti Sticker Update.

\`${prefix}antinuke antiprune enable/disable\`
Toggles Anti Prune.

\`${prefix}antinuke autorecovery enable/disable\`
Toggles Auto Recovery.

\`${prefix}antinuke reset\`
  Helps to reset all Antinuke Settings.`)
    .setFooter(`${client.user.username} • Page 3/4`, client.user.displayAvatarURL())

    const antiguidepg4 = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(`Antinuke (35)`, client.user.displayAvatarURL())
     .setDescription(`\`${prefix}antinuke whitelist user <user>\`
Add/Removes a user from whitelisted users in the server.

\`${prefix}antinuke whitelist role <role>\`
Add/Removes a role from whitelisted roles in the server.

\`${prefix}antinuke whitelist reset\`
Removes all the users/roles from whitelisted users/roles in the server.

\`${prefix}antinuke whitelist show\`
Shows list of whitelisted users/roles in the server.
  
\`${prefix}antinuke features\`
Shows all Antinuke features.`)
    .setFooter(`${client.user.username} • Page 4/4`, client.user.displayAvatarURL())

	const ServerOwner = message.guild.ownerId;

     const rajaa = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`You need to be either Server Owner or to be in Extra Owner to execute this command.`)
      .setFooter(client.user.tag, client.user.displayAvatarURL())

        await client.db11.get(`${message.guild.id}_eo`).then(async (dataa) => {
        const exowner = dataa.extraownerlist;

        if (!message.guild.ownerId.includes(message.author.id) && !exowner.includes(message.author.id) && !ownerIDS.includes(message.author.id)) {
          return message.channel.send({ embeds: [rajaa], components: [button2] });
    	}
      if (args.join(" ") === 'config') {
        return message.channel.send({ embeds: [settingss], components: [button] })
      } else if (args.join(" ") === 'enable') {
        if (isActivatedAlready) {
          return message.channel.send({ embeds: [eeeee], components: [button] })
        } else {
            await client.db.set(`${message.guild.id}_antinuke`, true),
            await client.db.set(`${message.guild.id}_antiban`, true),
            await client.db.set(`${message.guild.id}_antikick`, true),
            await client.db.set(`${message.guild.id}_antibot`, true),
            await client.db.set(`${message.guild.id}_antiunban`, true),
            await client.db.set(`${message.guild.id}_antiguildupdate`, true),
            await client.db.set(`${message.guild.id}_antimemberupdate`, true),
            await client.db.set(`${message.guild.id}_antichannelcreate`, true),
            await client.db.set(`${message.guild.id}_antichanneldelete`, true),
            await client.db.set(`${message.guild.id}_antichannelupdate`, true),
            await client.db.set(`${message.guild.id}_antirolecreate`, true),
            await client.db.set(`${message.guild.id}_antiroledelete`, true),
            await client.db.set(`${message.guild.id}_antiroleupdate`, true),
            await client.db.set(`${message.guild.id}_antiwebhookcreate`, true),
            await client.db.set(`${message.guild.id}_antiwebhookdelete`, true),
            await client.db.set(`${message.guild.id}_antiwebhookupdate`, true),
            await client.db.set(`${message.guild.id}_antiemojicreate`, true),
            await client.db.set(`${message.guild.id}_antiemojidelete`, true),
            await client.db.set(`${message.guild.id}_antiemojiupdate`, true),
            await client.db.set(`${message.guild.id}_antistickercreate`, true),
            await client.db.set(`${message.guild.id}_antistickerdelete`, true),
            await client.db.set(`${message.guild.id}_antistickerupdate`, true),
            await client.db.set(`${message.guild.id}_antiprune`, true),
            await client.db.set(`${message.guild.id}_autorecovery`, true),
            await client.db.set(`${message.guild.id}_banpunish`, true),
            await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] } );
          return message.channel.send({ embeds: [eeee], components: [button] });
        }
      } else if (args.join(" ") === 'disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [ddddd], components: [button] })
        } else {
            await client.db.delete(`${message.guild.id}_antinuke`, true),
            await client.db.delete(`${message.guild.id}_antiban`, true),
            await client.db.delete(`${message.guild.id}_antikick`, true),
            await client.db.delete(`${message.guild.id}_antibot`, true),
            await client.db.delete(`${message.guild.id}_antiunban`, true),
            await client.db.delete(`${message.guild.id}_antiguildupdate`, true),
            await client.db.delete(`${message.guild.id}_antimemberupdate`, true),
            await client.db.delete(`${message.guild.id}_antichannelcreate`, true),
            await client.db.delete(`${message.guild.id}_antichanneldelete`, true),
            await client.db.delete(`${message.guild.id}_antichannelupdate`, true),
            await client.db.delete(`${message.guild.id}_antirolecreate`, true),
            await client.db.delete(`${message.guild.id}_antiroledelete`, true),
            await client.db.delete(`${message.guild.id}_antiroleupdate`, true),
            await client.db.delete(`${message.guild.id}_antiwebhookcreate`, true),
            await client.db.delete(`${message.guild.id}_antiwebhookdelete`, true),
            await client.db.delete(`${message.guild.id}_antiwebhookupdate`, true),
            await client.db.delete(`${message.guild.id}_antiemojicreate`, true),
            await client.db.delete(`${message.guild.id}_antiemojidelete`, true),
            await client.db.delete(`${message.guild.id}_antiemojiupdate`, true),
            await client.db.delete(`${message.guild.id}_antistickercreate`, true),
            await client.db.delete(`${message.guild.id}_antistickerdelete`, true),
            await client.db.delete(`${message.guild.id}_antistickerupdate`, true),
            await client.db.delete(`${message.guild.id}_antiprune`, true),
            await client.db.delete(`${message.guild.id}_autorecovery`, true),
            await client.db.delete(`${message.guild.id}_kickpunish`, true),
            await client.db.delete(`${message.guild.id}_banpunish`, true),
            await client.db.delete(`${message.guild.id}_wl`);
          return message.channel.send({ embeds: [dddd], components: [button] });
        }
      } else if (args.join(" ") === 'reset') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [ddddd], components: [button] })
        } else {
            await client.db.delete(`${message.guild.id}_antinuke`, true),
            await client.db.delete(`${message.guild.id}_antiban`, true),
            await client.db.delete(`${message.guild.id}_antikick`, true),
            await client.db.delete(`${message.guild.id}_antibot`, true),
            await client.db.delete(`${message.guild.id}_antiunban`, true),
            await client.db.delete(`${message.guild.id}_antiguildupdate`, true),
            await client.db.delete(`${message.guild.id}_antimemberupdate`, true),
            await client.db.delete(`${message.guild.id}_antichannelcreate`, true),
            await client.db.delete(`${message.guild.id}_antichanneldelete`, true),
            await client.db.delete(`${message.guild.id}_antichannelupdate`, true),
            await client.db.delete(`${message.guild.id}_antirolecreate`, true),
            await client.db.delete(`${message.guild.id}_antiroledelete`, true),
            await client.db.delete(`${message.guild.id}_antiroleupdate`, true),
            await client.db.delete(`${message.guild.id}_antiwebhookcreate`, true),
            await client.db.delete(`${message.guild.id}_antiwebhookdelete`, true),
            await client.db.delete(`${message.guild.id}_antiwebhookupdate`, true),
            await client.db.delete(`${message.guild.id}_antiemojicreate`, true),
            await client.db.delete(`${message.guild.id}_antiemojidelete`, true),
            await client.db.delete(`${message.guild.id}_antiemojiupdate`, true),
            await client.db.delete(`${message.guild.id}_antistickercreate`, true),
            await client.db.delete(`${message.guild.id}_antistickerdelete`, true),
            await client.db.delete(`${message.guild.id}_antistickerupdate`, true),
            await client.db.delete(`${message.guild.id}_antiprune`, true),
            await client.db.delete(`${message.guild.id}_autorecovery`, true),
            await client.db.delete(`${message.guild.id}_kickpunish`, true),
            await client.db.delete(`${message.guild.id}_banpunish`, true),
            await client.db.delete(`${message.guild.id}_wl`);
          return message.channel.send({ embeds: [dddd], components: [button] });
        }
      } else if (args.join(" ") === 'antiban enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antiban) {
          return message.channel.send({ embeds: [antibanalreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antiban`, true);
          return message.channel.send({ embeds: [antibanon], components: [button] });
        }
      } else if (args.join(" ") === 'antiban disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antiban) {
          return message.channel.send({ embeds: [antibanalreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antiban`, true);
          return message.channel.send({ embeds: [antibanoff], components: [button] });
        }
      } else if (args.join(" ") === 'antikick enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antikick) {
          return message.channel.send({ embeds: [antikickalreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antikick`, true);
          return message.channel.send({ embeds: [antikickon], components: [button] });
        }
      } else if (args.join(" ") === 'antikick disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antikick) {
          return message.channel.send({ embeds: [antikickalreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antikick`, true);
          return message.channel.send({ embeds: [antikickoff], components: [button] });
        }
      } else if (args.join(" ") === 'antibot enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antibot) {
          return message.channel.send({ embeds: [antibotalreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antibot`, true);
          return message.channel.send({ embeds: [antiboton], components: [button] });
        }
      } else if (args.join(" ") === 'antibot disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antibot) {
          return message.channel.send({ embeds: [antibotalreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antibot`, true);
          return message.channel.send({ embeds: [antibotoff], components: [button] });
        }
      } else if (args.join(" ") === 'antiunban enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antiunban) {
          return message.channel.send({ embeds: [antiunbanalreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antiunban`, true);
          return message.channel.send({ embeds: [antiunbanon], components: [button] });
        }
      } else if (args.join(" ") === 'antiunban disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antiunban) {
          return message.channel.send({ embeds: [antiunbanalreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antiunban`, true);
          return message.channel.send({ embeds: [antiunbanoff], components: [button] });
        }
      } else if (args.join(" ") === 'antiguild update enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antiguildup) {
          return message.channel.send({ embeds: [antiguildupalreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antiguildupdate`, true);
          return message.channel.send({ embeds: [antiguildupon], components: [button] });
        }
      } else if (args.join(" ") === 'antiguild update disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antiguildup) {
          return message.channel.send({ embeds: [antiguildupalreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antiguildupdate`, true);
          return message.channel.send({ embeds: [antiguildupoff], components: [button] });
        }
      } else if (args.join(" ") === 'antimember update enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antimemberup) {
          return message.channel.send({ embeds: [antimemberupalreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antimemberupdate`, true);
          return message.channel.send({ embeds: [antimemberupon], components: [button] });
        }
      } else if (args.join(" ") === 'antimember update disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antimemberup) {
          return message.channel.send({ embeds: [antimemberupalreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antimemberupdate`, true);
          return message.channel.send({ embeds: [antimemberupoff], components: [button] });
        }
      } else if (args.join(" ") === 'antichannel create enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antichannelcreate) {
          return message.channel.send({ embeds: [antichannelcreatealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antichannelcreate`, true);
          return message.channel.send({ embeds: [antichannelcreateon], components: [button] });
        }
      } else if (args.join(" ") === 'antichannel create disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antichannelcreate) {
          return message.channel.send({ embeds: [antichannelcreatealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antichannelcreate`, true);
          return message.channel.send({ embeds: [antichannelcreateoff], components: [button] });
        }
      } else if (args.join(" ") === 'antichannel delete enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antichanneldelete) {
          return message.channel.send({ embeds: [antichanneldeletealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antichanneldelete`, true);
          return message.channel.send({ embeds: [antichanneldeleteon], components: [button] });
        }
      } else if (args.join(" ") === 'antichannel delete disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antichanneldelete) {
          return message.channel.send({ embeds: [antichanneldeletealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antichanneldelete`, true);
          return message.channel.send({ embeds: [antichanneldeleteoff], components: [button] });
        }
      } else if (args.join(" ") === 'antichannel update enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antichannelupdate) {
          return message.channel.send({ embeds: [antichannelupdatealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antichannelupdate`, true);
          return message.channel.send({ embeds: [antichannelupdateon], components: [button] });
        }
      } else if (args.join(" ") === 'antichannel update disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antichannelupdate) {
          return message.channel.send({ embeds: [antichannelupdatealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antichannelupdate`, true);
          return message.channel.send({ embeds: [antichannelupdateoff], components: [button] });
        }
      } else if (args.join(" ") === 'antirole create enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antirolecreate) {
          return message.channel.send({ embeds: [antirolecreatealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antirolecreate`, true);
          return message.channel.send({ embeds: [antirolecreateon], components: [button] });
        }
      } else if (args.join(" ") === 'antirole create disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antirolecreate) {
          return message.channel.send({ embeds: [antirolecreatealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antirolecreate`, true);
          return message.channel.send({ embeds: [antirolecreateoff], components: [button] });
        }
      } else if (args.join(" ") === 'antirole delete enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antiroledelete) {
          return message.channel.send({ embeds: [antiroledeletealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antiroledelete`, true);
          return message.channel.send({ embeds: [antiroledeleteon], components: [button] });
        }
      } else if (args.join(" ") === 'antirole delete disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antiroledelete) {
          return message.channel.send({ embeds: [antiroledeletealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antiroledelete`, true);
          return message.channel.send({ embeds: [antiroledeleteoff], components: [button] });
        }
      } else if (args.join(" ") === 'antirole update enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antiroleupdate) {
          return message.channel.send({ embeds: [antiroleupdatealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antiroleupdate`, true);
          return message.channel.send({ embeds: [antiroleupdateon], components: [button] });
        }
      } else if (args.join(" ") === 'antirole update disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antiroleupdate) {
          return message.channel.send({ embeds: [antiroleupdatealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antiroleupdate`, true);
          return message.channel.send({ embeds: [antiroleupdateoff], components: [button] });
        }
      } else if (args.join(" ") === 'antiwebhook create enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antiwebhookcreate) {
          return message.channel.send({ embeds: [antiwebhookcreatealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antiwebhookcreate`, true);
          return message.channel.send({ embeds: [antiwebhookcreateon], components: [button] });
        }
      } else if (args.join(" ") === 'antiwebhook create disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antiwebhookcreate) {
          return message.channel.send({ embeds: [antiwebhookcreatealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antiwebhookcreate`, true);
          return message.channel.send({ embeds: [antiwebhookcreateoff], components: [button] });
        }
      } else if (args.join(" ") === 'antiwebhook delete enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antiwebhookdelete) {
          return message.channel.send({ embeds: [antiwebhookdeletealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antiwebhookdelete`, true);
          return message.channel.send({ embeds: [antiwebhookdeleteon], components: [button] });
        }
      } else if (args.join(" ") === 'antiwebhook delete disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antiwebhookdelete) {
          return message.channel.send({ embeds: [antiwebhookdeletealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antiwebhookdelete`, true);
          return message.channel.send({ embeds: [antiwebhookdeleteoff], components: [button] });
        }
      } else if (args.join(" ") === 'antiwebhook update enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antiwebhookupdate) {
          return message.channel.send({ embeds: [antiwebhookupdatealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antiwebhookupdate`, true);
          return message.channel.send({ embeds: [antiwebhookupdateon], components: [button] });
        }
      } else if (args.join(" ") === 'antiwebhook update disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antiwebhookupdate) {
          return message.channel.send({ embeds: [antiwebhookupdatealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antiwebhookupdate`, true);
          return message.channel.send({ embeds: [antiwebhookupdateoff], components: [button] });
        }
      } else if (args.join(" ") === 'antiemoji create enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antiemojicreate) {
          return message.channel.send({ embeds: [antiemojicreatealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antiemojicreate`, true);
          return message.channel.send({ embeds: [antiemojicreateon], components: [button] });
        }
      } else if (args.join(" ") === 'antiemoji create disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antiemojicreate) {
          return message.channel.send({ embeds: [antiemojicreatealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antiemojicreate`, true);
          return message.channel.send({ embeds: [antiemojicreateoff], components: [button] });
        }
      } else if (args.join(" ") === 'antiemoji delete enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antiemojidelete) {
          return message.channel.send({ embeds: [antiemojideletealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antiemojidelete`, true);
          return message.channel.send({ embeds: [antiemojideleteon], components: [button] });
        }
      } else if (args.join(" ") === 'antiemoji delete disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antiemojidelete) {
          return message.channel.send({ embeds: [antiemojideletealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antiemojidelete`, true);
          return message.channel.send({ embeds: [antiemojideleteoff], components: [button] });
        }
      } else if (args.join(" ") === 'antiemoji update enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antiemojiupdate) {
          return message.channel.send({ embeds: [antiemojiupdatealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antiemojiupdate`, true);
          return message.channel.send({ embeds: [antiemojiupdateon], components: [button] });
        }
      } else if (args.join(" ") === 'antiemoji update disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antiemojiupdate) {
          return message.channel.send({ embeds: [antiemojiupdatealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antiemojiupdate`, true);
          return message.channel.send({ embeds: [antiemojiupdateoff], components: [button] });
        }
      } else if (args.join(" ") === 'antisticker create enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antistickercreate) {
          return message.channel.send({ embeds: [antistickercreatealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antistickercreate`, true);
          return message.channel.send({ embeds: [antistickercreateon], components: [button] });
        }
      } else if (args.join(" ") === 'antisticker create disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antistickercreate) {
          return message.channel.send({ embeds: [antistickercreatealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antistickercreate`, true);
          return message.channel.send({ embeds: [antistickercreateoff], components: [button] });
        }
      } else if (args.join(" ") === 'antisticker delete enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antistickerdelete) {
          return message.channel.send({ embeds: [antistickerdeletealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antistickerdelete`, true);
          return message.channel.send({ embeds: [antistickerdeleteon], components: [button] });
        }
      } else if (args.join(" ") === 'antisticker delete disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antistickerdelete) {
          return message.channel.send({ embeds: [antistickerdeletealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antistickerdelete`, true);
          return message.channel.send({ embeds: [antistickerdeleteoff], components: [button] });
        }
      } else if (args.join(" ") === 'antisticker update enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antistickerupdate) {
          return message.channel.send({ embeds: [antistickerupdatealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antistickerupdate`, true);
          return message.channel.send({ embeds: [antistickerupdateon], components: [button] });
        }
      } else if (args.join(" ") === 'antisticker update disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antistickerupdate) {
          return message.channel.send({ embeds: [antistickerupdatealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antistickerupdate`, true);
          return message.channel.send({ embeds: [antistickerupdateoff], components: [button] });
        }
      } else if (args.join(" ") === 'antiprune enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (antiprune) {
          return message.channel.send({ embeds: [antiprunealreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_antiprune`, true);
          return message.channel.send({ embeds: [antipruneon], components: [button] });
        }
      } else if (args.join(" ") === 'antiprune disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!antiprune) {
          return message.channel.send({ embeds: [antiprunealreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_antiprune`, true);
          return message.channel.send({ embeds: [antipruneoff], components: [button] });
        }
      } else if (args.join(" ") === 'autorecovery enable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (autorecovery) {
          return message.channel.send({ embeds: [autorecoveryalreadyon], components: [button] })
        } else {
          await client.db.set(`${message.guild.id}_autorecovery`, true);
          return message.channel.send({ embeds: [autorecoveryon], components: [button] });
        }
      } else if (args.join(" ") === 'autorecovery disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle], components: [button] })
        } if (!autorecovery) {
          return message.channel.send({ embeds: [autorecoveryalreadyoff], components: [button] })
        } else {
          await client.db.delete(`${message.guild.id}_autorecovery`, true);
          return message.channel.send({ embeds: [autorecoveryoff], components: [button] });
        }
      } else if (args.join(" ") === 'features') {
        return message.channel.send({ embeds: [features], components: [button] });
      } else if (args[0] === `whitelist` && args[1] === `add`) {
          
          const nodata = new MessageEmbed()
          .setColor('2f3136')
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setDescription(`Please run the whitelist command again because earlier database was not seted up.`);
          
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle] })
        } else {
            await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
                if (!data) {
                    await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] } );
                    return message.channel.send({ embeds: [nodata] });
                } else {
                    if (!user) {
                        return message.channel.send({ embeds: [mentionsomeone] });
                    } else {
                        if (data.whitelisted.includes(ID)) {
                            return message.channel.send({ embeds: [alwlist] })
                        }  else {
                            await client.db.push(`${message.guild.id}_wl.whitelisted`, ID);
                            return message.channel.send({ embeds: [wlist] })
                        }
                    }
				}
			})
        }
      } else if (args[0] === `wl` && args[1] === `add`) {
          
          const nodata = new MessageEmbed()
          .setColor('2f3136')
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setDescription(`Please run the whitelist command again because earlier database was not seted up.`);
          
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle] })
        } else {
            await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
                if (!data) {
                    await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] } );
                    return message.channel.send({ embeds: [nodata] });
                } else {
                    if (!user) {
                        return message.channel.send({ embeds: [mentionsomeone] });
                    } else {
                        if (data.whitelisted.includes(ID)) {
                            return message.channel.send({ embeds: [alwlist] })
                        }  else {
                            await client.db.push(`${message.guild.id}_wl.whitelisted`, ID);
                            return message.channel.send({ embeds: [wlist] })
                        }
                    }
				}
			})
        }
      } else if (args[0] === `whitelist` && args[1] === `remove`) {
          const nodata = new MessageEmbed()
          .setColor('2f3136')
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setDescription(`Please run the whitelist command again because earlier database was not seted up.`);
          
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle] })
        } else {
            await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
                if (!data) {
                    await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] } );
                    return message.channel.send({ embeds: [nodata] });
                } else {
                    if (!user) {
                        return message.channel.send({ embeds: [mentionsomeone] });
                    } else {
                        if (!data.whitelisted.includes(ID)) {
                            return message.channel.send({ embeds: [nowlist] })
                        } else {
                            await client.db.pull(`${message.guild.id}_wl.whitelisted`, ID);
                            return message.channel.send({ embeds: [remwlist] })
                        }
                    }
                }
            })
        }
      } else if (args[0] === `wl` && args[1] === `remove`) {
          const nodata = new MessageEmbed()
          .setColor('2f3136')
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setDescription(`Please run the whitelist command again because earlier database was not seted up.`);
          
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle] })
        } else {
            await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
                if (!data) {
                    await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] } );
                    return message.channel.send({ embeds: [nodata] });
                } else {
                    if (!user) {
                        return message.channel.send({ embeds: [mentionsomeone] });
                    } else {
                        if (!data.whitelisted.includes(ID)) {
                            return message.channel.send({ embeds: [nowlist] })
                        } else {
                            await client.db.pull(`${message.guild.id}_wl.whitelisted`, ID);
                            return message.channel.send({ embeds: [remwlist] })
                        }
                    }
                }
            })
        }
      } else if (args[0] === `whitelist` && args[1] === `show`) {
          const nodata = new MessageEmbed()
          .setColor('2f3136')
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setDescription(`Please run the whitelist command again because earlier database was not seted up.`);
          
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle] })
        } else {
            await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
                if (!data) {
                    await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] } );
                    return message.channel.send({ embeds: [nodata] });
                } else {
                    const users = data.whitelisted;
                    const mentions = [];
                    
                    if (users.length !== 0) {
            			let x = 0; x < data.length; x++
                        const member = client.users.cache.get(users)
                        users.forEach((userId, i) => mentions.push(`\`[${i + 1}]\` | ID: [${userId}](https://discord.com/users/${userId}) | <@${userId}>`))
                        const wlistembed = new MessageEmbed()
                        .setColor(`2f3136`)
              			.setAuthor(client.user.tag, client.user.displayAvatarURL())
                        .setTitle(`Total Whitelisted Users`)
                        .setDescription(mentions.join('\n'))
      					.setFooter(`Made by ${client.guilds.cache.get(`968742392507293756`).name} with 💞`, `${client.guilds.cache.get(`968742392507293756`).iconURL({ dynamic: true })}`);
                      return message.channel.send({ embeds: [wlistembed] })
                    } else {
                        return message.channel.send({  embeds: [whynoone] })
            		}
          		}
            })
        }
      } else if (args[0] === `wl` && args[1] === `show`) {
          const nodata = new MessageEmbed()
          .setColor('2f3136')
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setDescription(`Please run the whitelist command again because earlier database was not seted up.`);
          
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle] })
        } else {
            await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
                if (!data) {
                    await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] } );
                    return message.channel.send({ embeds: [nodata] });
                } else {
                    const users = data.whitelisted;
                    const mentions = [];
                    
                    if (users.length !== 0) {
            			let x = 0; x < data.length; x++
                        const member = client.users.cache.get(users)
                        users.forEach((userId, i) => mentions.push(`\`[${i + 1}]\` | ID: [${userId}](https://discord.com/users/${userId}) | <@${userId}>`))
                        const wlistembed = new MessageEmbed()
                        .setColor(`2f3136`)
              			.setAuthor(client.user.tag, client.user.displayAvatarURL())
                        .setTitle(`Total Whitelisted Users`)
                        .setDescription(mentions.join('\n'))
     					 .setFooter(`Made by ${client.guilds.cache.get(`968742392507293756`).name} with 💞`, `${client.guilds.cache.get(`968742392507293756`).iconURL({ dynamic: true })}`);
                      return message.channel.send({ embeds: [wlistembed] })
                    } else {
                        return message.channel.send({  embeds: [whynoone] })
            		}
          		}
            })
        }
      } else if (args[0] === 'whitelist' && args[1] === 'reset') {
          const nodata = new MessageEmbed()
          .setColor('2f3136')
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setDescription(`Please run the whitelist command again because earlier database was not seted up.`);
          
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle] })
        } else {
            await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
                if (!data) {
                    await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] } );
                    return message.channel.send({ embeds: [nodata] });
                } else {
                    const users = data.whitelisted;
                    const mentions = [];
                    if (users.length !== 0) {
                    await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
                    return message.channel.send({ embeds: [remall] });
                		} else {
                        return message.channel.send({ embeds: [noone] })
                    	}
                	} 
          		})
        	}
      	} else if (args[0] === 'wl' && args[1] === 'reset') {
          const nodata = new MessageEmbed()
          .setColor('2f3136')
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .setDescription(`Please run the whitelist command again because earlier database was not seted up.`);
          
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle] })
        } else {
            await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
                if (!data) {
                    await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] } );
                    return message.channel.send({ embeds: [nodata] });
                } else {
                    const users = data.whitelisted;
                    const mentions = [];
                    if (users.length !== 0) {
                    await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
                    return message.channel.send({ embeds: [remall] });
                		} else {
                        return message.channel.send({ embeds: [noone] })
                    	}
                	} 
          		})
        	}
      	} else if (args[0] === 'punishment' && args[1] === 'set') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle] })
        } else {
          let msg = await message.channel.send({ embeds: [punishwlistguide], components: [r3]});
          const collector = await msg.createMessageComponentCollector({
            filter :(interaction) => {
                if(message.author.id === interaction.user.id) return true;
                else {
                    interaction.reply({content : `<a:ET_cross:1003992348205777036> | That's not your session run : \`${prefix}help\` to create your own.` , ephemeral : true})
                }
            },
            time : 1000 * 10,
            idle : 1000 * 5
        });
        collector.on('collect', async(interaction) => {
          if(interaction.isButton()) {
                if (interaction.customId === `bannn`) {
                  if (banpunish) {
                    return interaction.update({ embeds: [alban], components: [button]})
                  } else {
                    await client.db.set(`${interaction.guild.id}_banpunish`, true);
                    await client.db.delete(`${interaction.guild.id}_kickpunish`, true);
                    return interaction.update({embeds : [setban], components: [button]});
                }
              }
            }
          if(interaction.isButton()) {
                if (interaction.customId === `kickkk`) {
                  if (kickpunish) {
                    return interaction.update({ embeds: [alkick], components: [button]})
                  } else {
                    await client.db.set(`${interaction.guild.id}_kickpunish`, true);
                    await client.db.delete(`${interaction.guild.id}_banpunish`, true);
                    return interaction.update({embeds : [setkick], components: [button]});
                }
              }
            }
          })
        }
      } else {
        
        let msg = await message.channel.send({embeds : [antiguidepg1] , components : [pag]});
        let page = 0;
    
        let embedss = [];
    
    embedss.push(antiguidepg1);
    embedss.push(antiguidepg2);
    embedss.push(antiguidepg3);
    embedss.push(antiguidepg4);
    
    const collector = await msg.createMessageComponentCollector({
            filter :(interaction) => {
                if (message.author.id === interaction.user.id) return true;
              else {
      return interaction.reply({content : `<a:ET_cross:1003992348205777036> | This Pagination is not for you.` , ephemeral : true})
        }
            },
            time : 100000,
            idle : 100000/2
        });

        collector.on('collect', async (interaction) => {
          if(interaction.isButton()) {
                if(interaction.customId === `lol4`) {
                    page = page + 1 < embedss.length ? ++page : 0;
                    return interaction.update({embeds : [embedss[page]]});
                } 
              if (interaction.customId === `lol5`) {
                    return interaction.update({embeds : [antiguidepg4]});
                }
              if(interaction.customId === `lol3`) {
                    return msg.delete()
                }
              if(interaction.customId === `lol2`) {
                    page = page > 0 ? --page : embedss.length - 1;
                    return interaction.update({embeds : [embedss[page]]});
                }
              if(interaction.customId === `lol1`) {
                    return interaction.update({embeds : [antiguidepg1]})
                }
            }
        });
        collector.on('end', async() => {
            msg.edit({embeds : [antiguidepg1] , components : [button] , content : `<a:security:1055831548101939331> | Antinuke Help Query Got Timed Out!`})
        	});
      	}
    })
  }
}