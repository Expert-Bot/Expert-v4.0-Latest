const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const backup = require("discord-backup");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('backup')
        .setDescription('Manage server backups.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Create a backup for the server with optional additional options.')
                .addStringOption(option =>
                    option.setName('options')
                        .setDescription('For example, `{ "maxMessagesPerChannel": 10 }`.')
                        .setRequired(false))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('load')
                .setDescription('Load a backup on the server.')
                .addStringOption(option =>
                    option.setName('backup_id')
                        .setDescription('The ID of the backup to load')
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('List all available backups.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Delete a backup from the server.')
                .addStringOption(option =>
                    option.setName('backup_id')
                        .setDescription('The ID of the backup to delete')
                        .setRequired(true))
        ),
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'create') {
            // Check member permissions
            if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
                return interaction.reply({ content: ":x: You must be an administrator of this server to request a backup!", ephemeral: true });
            }
            // Parse options
            const backupOptions = interaction.options.getString('options') || '{}';
            const parsedOptions = JSON.parse(backupOptions);

            // Send initial acknowledgment response with loading message
            interaction.deferReply({ ephemeral: true }).catch(console.error);

            // Create the backup
            backup.create(interaction.guild, parsedOptions).then((backupData) => {
                // Send information to the backup owner
                interaction.user.send(`The backup has been created! To load it, type this command on the server of your choice: \`/backup load ${backupData.id}\`!`);
                interaction.editReply({ content: ":white_check_mark: Backup successfully created. The backup ID was sent in DM!", ephemeral: true });
            }).catch(err => {
                console.error(err);
                interaction.editReply({ content: ":x: Failed to create backup.", ephemeral: true });
            });
        } else if (subcommand === 'load') {
            // Check member permissions
            if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
                return interaction.reply({ content: ":x: You must be an administrator of this server to load a backup!", ephemeral: true });
            }
            // Get backup ID
            const backupID = interaction.options.getString('backup_id');

            if (!backupID) {
                return interaction.reply({ content: ":x: You must specify a valid backup ID!", ephemeral: true });
            }

            // Fetch the backup
            backup.fetch(backupID).then(async () => {
                // Create the confirmation button
                const confirmButton = new ButtonBuilder()
                    .setCustomId('confirm_backup_load')
                    .setLabel('Confirm')
                    .setStyle(ButtonStyle.Success);

                const row = new ActionRowBuilder().addComponents(confirmButton);

                // Send the confirmation message with the button
                interaction.reply({ content: ":warning: When the backup is loaded, all the channels, roles, etc. will be replaced! Click the button below to confirm.", components: [row], ephemeral: true });

                // Create a collector for the button click
                const filter = i => i.customId === 'confirm_backup_load' && i.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 20000 });

                collector.on('collect', async i => {
                    // Load the backup
                    backup.load(backupID, interaction.guild).then(() => {
                        // Remove the backup
                        backup.remove(backupID);
                        interaction.editReply({ content: ":white_check_mark: Backup loaded successfully!", ephemeral: true });
                    }).catch(err => {
                        console.error(err);
                        interaction.editReply({ content: ":x: Failed to load backup.", ephemeral: true });
                    });
                });

                collector.on('end', collected => {
                    if (collected.size === 0) {
                        interaction.editReply({ content: ":x: Time's up! Cancelled backup loading.", ephemeral: true });
                    }
                });
            }).catch(err => {
                console.error(err);
                interaction.reply({ content: ":x: No backup found for the specified ID!", ephemeral: true });
            });
        } else if (subcommand === 'list') {
            // List all available backups
            backup.list().then(backups => {
                interaction.reply({ content: `Available backups: ${backups.join(', ')}`, ephemeral: true });
            }).catch(err => {
                console.error(err);
                interaction.reply({ content: ":x: Failed to fetch backup list.", ephemeral: true });
            });
        } else if (subcommand === 'delete') {
            if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
                return interaction.reply({ content: ":x: You must be an administrator of this server to delete a backup!", ephemeral: true });
            }
            // Get backup ID
            const backupID = interaction.options.getString('backup_id');

            if (!backupID) {
                return interaction.reply({ content: ":x: You must specify a valid backup ID!", ephemeral: true });
            }

            // Send initial acknowledgment response with loading message
            interaction.deferReply({ ephemeral: true }).catch(console.error);

            // Create the confirmation button
            const confirmButton = new ButtonBuilder()
                .setCustomId('confirm_backup_delete')
                .setLabel('Confirm')
                .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder().addComponents(confirmButton);

            // Send the confirmation message with the button
            interaction.reply({ content: ":warning: Are you sure you want to delete this backup? This action cannot be undone.", components: [row], ephemeral: true }).then(() => {
                // Create a collector for the button click
                const filter = i => i.customId === 'confirm_backup_delete' && i.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 20000 });

                collector.on('collect', async i => {
                    // Delete the backup
                    backup.remove(backupID).then(() => {
                        // Send success message
                        interaction.followUp({ content: ":white_check_mark: Backup successfully deleted!", ephemeral: true }).catch(console.error);
                    }).catch(err => {
                        console.error(err);
                        // Send error message
                        interaction.followUp({ content: ":x: Failed to delete backup.", ephemeral: true }).catch(console.error);
                    });
                });

                collector.on('end', collected => {
                    if (collected.size === 0) {
                        // Send timeout message
                        interaction.followUp({ content: ":x: Time's up! Cancelled backup deletion.", ephemeral: true }).catch(console.error);
                    }
                });
            }).catch(console.error);
            return;
        }
    },
};
