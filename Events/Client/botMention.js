module.exports = async (client, message) => {
  name: "messageCreate";
  if (message.author.bot) return; // Ignore messages from other bots

  // Check if the bot is mentioned using both explicit mentions and @everyone/here
  let mentioned = message.mentions.has(client.user);

  if (message.content.match(/(@)?(everyone|here)/gi)) {
    mentioned = false;
    return;
  } // Check if everyone is mentioned or @here, If so then ignores

  if (mentioned) {
    try {
      // Add your preferred emoji reaction
      await message.react("👋"); // Customize this emoji as needed
    } catch (error) {
      console.error("Error reacting to message:", error);
    }
  }
};
