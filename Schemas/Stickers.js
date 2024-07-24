module.exports = {
    formatSupported: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    findStickers: async function (interaction, OldName) {
        return interaction.guild.stickers.fetch().then((stickers) => {
            return stickers.find((sticker) => sticker.name === OldName);
        }).catch((error) => {
            return;
        });
    },
    remove: async function (client, interaction) {
        const name = interaction.options.getString('name');
        const findSticker = await module.exports.findStickers(interaction, name);
        if (!findSticker) return;

        await findSticker.delete().catch(err => {
            return;
        });


        return true;
    },
    edit: async function (client, interaction) {
        const NewName = interaction.options.getString('newname');
        const OldName = interaction.options.getString('oldname');

        const findSticker = await module.exports.findStickers(interaction, OldName);
        if (!findSticker) return;

        await interaction.guild.stickers.edit(findSticker.id, {name: NewName}).catch((err => {
            return;
        }));

        return true;
    },
    upload: async function (client, interaction) {
        const file = await interaction.options.getAttachment('sticker');
        const name = interaction.options.getString('name');
        if (!module.exports.formatSupported.includes(`${file.contentType}`)) return;

        const final = await interaction.guild.stickers.create({file: file.attachment, name: `${name}`}).catch((err => {
            return;
        }));

        if(!final) return false;
        return true;
    }
}