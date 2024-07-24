const { readdirSync } = require('fs');

module.exports = {
  nombre: 'help',
  description: 'Shows the available prefix commands.',
  usage: ['<prefix>help'],
  run: async (client, message) => {
    const prefixCommandFiles = readdirSync('./prefixcommands').filter(file => file.endsWith('.js'));
    const prefixCommands = [];

    prefixCommandFiles.forEach(file => {
      const command = require(`../prefixcommands/${file}`);
      prefixCommands.push(command);
    });

    let response = 'Available Prefix Commands:\n';

    prefixCommands.forEach(command => {
      response += `**${command.nombre}**\n`;
      response += `**Description:**\n\`\`\`${command.description}\n\`\`\``;
      response += '\n';
    });

    message.reply({ content: response, ephemeral: true });
  },
};
