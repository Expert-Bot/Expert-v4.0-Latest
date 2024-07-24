const { EmbedBuilder } = require('discord.js');
 
module.exports = {
    name: 'random',
    aliases: ['r'],
    run: async(client, message, args) => {
        
        // Help command implementation
        if (args.length === 1 && args[0].toLowerCase() === 'help') {
            const helpEmbed = new EmbedBuilder()
            .setTitle("🎲 Random Command Help 🎲")
            .setDescription("This command selects random options or numbers based on your input.")
            .addFields(
                { name: "💡 Basic Usage", value: "`!random option1|option2|option3...`" },
                { name: "⚖️ Option Weighting", value: "Weight options with `*`. E.g., `option1*3`." },
                { name: "🔢 Picking Multiple Options", value: "Use `amount:<number>` to pick multiple. E.g., `!random amount:2|option1|option2`." },
                { name: "🔀 Random Number in Range", value: "Specify a range like `2-24` to pick within that range." },
                { name: "📊 Combining Features", value: "Combine features. E.g., `!random amount:3|2-24|option1|option2`." },
                { name: "🔗 Example", value: "`!random amount:3|apple|banana|cherry`" },
                { name: "📝 Note", value: "You can mix numbers and options freely! They only have to be seperated by `|`!" }
            )
            .setColor("#ff4500")
            .setThumbnail('https://example.com/thumbnail.png')
            .setFooter({ text: "Tip: Use the command in fun and creative ways!" })
            .setTimestamp();
 
            message.channel.send({ embeds: [helpEmbed] });
            return;
        }
 
        let numChoices;
        let ranges = [];
        let options = args.join(" ").split("|").map(item => item.trim());
 
        // Check for and handle the "amount:" argument, number ranges, and option weighting
        options = options.reduce((acc, item) => {
            if (item.toLowerCase().startsWith("amount:")) {
                numChoices = parseInt(item.split(":")[1]);
            } else if (item.includes("-")) {
                let [rangeStr, weightStr] = item.split("*").map(part => part.trim());
                const rangeParts = rangeStr.split("-").map(Number);
                const weight = parseInt(weightStr, 10) || 1; // Default weight is 1 if not specified
                if (rangeParts.every(n => !isNaN(n)) && rangeParts[0] < rangeParts[1]) {
                    ranges.push({ range: rangeParts, weight });
                }
            } else {
                // Check for option weighting
                const [option, weightStr] = item.split("*");
                const weight = parseInt(weightStr, 10) || 1; // Default weight is 1 if not specified
                for (let i = 0; i < weight; i++) {
                    acc.push(option.trim());
                }
            }
            return acc;
        }, []);
 
        // Function to get random choices
        const getRandomChoices = (num) => {
            let availableOptions = [];
 
            // Generate numbers for each weighted range and add to available options
            ranges.forEach(({ range, weight }) => {
                for (let i = range[0]; i <= range[1]; i++) {
                    for (let j = 0; j < weight; j++) {
                        availableOptions.push(i.toString());
                    }
                }
            });
 
            availableOptions.push(...options); // Combine options with numbers from ranges
 
            let selections = [];
            for (let i = 0; i < num; i++) {
                if (availableOptions.length === 0) break;
                const randomIndex = Math.floor(Math.random() * availableOptions.length);
                selections.push(availableOptions[randomIndex]);
                availableOptions.splice(randomIndex, 1); // Remove selected item
            }
            return selections;
        };
 
        // Determine number of choices to make
        const numToPick = numChoices && numChoices > 0 ? numChoices : 1;
 
        // Initial random choices
        const selectedItems = getRandomChoices(numToPick);
 
        // Array of different phrases for the description
        const phrases = [
            "Here's what I picked:",
            "I have made my choice:",
            "The lucky selection:",
            "Randomly chosen:",
            "I would go with:",
            "Let fate decide... it chose:",
            "Selected by chance:",
            "And the result is:"
        ];
 
        // Pick a random phrase
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
 
        // Create an embed with the result and random phrase
        const embed = new EmbedBuilder()
        .setTitle("Random Selection")
        .setDescription(`${randomPhrase} ${selectedItems.join(", ")}`)
        .setColor("#0099ff");
 
        // Send the embed to the channel
        const sentMessage = await message.channel.send({ embeds: [embed] });
 
        // React with the reroll emoji
        const rerollEmoji = '🎲';
        await sentMessage.react(rerollEmoji);
 
        // Set up a reaction collector
        const filter = (reaction, user) => {
            return reaction.emoji.name === rerollEmoji && user.id === message.author.id;
        };
 
        const rerollLimit = 3; // Maximum rerolls allowed
        let rerollCount = 0; // Current reroll count
 
        const collector = sentMessage.createReactionCollector({ filter, dispose: true, time: 60000 });
 
        // Handle reroll functionality
        const handleReroll = () => {
            if (rerollCount < rerollLimit) {
                rerollCount++;
                const newRandomChoices = getRandomChoices(numToPick);
                embed.setDescription(`${randomPhrase} ${newRandomChoices.join(", ")}`);
                sentMessage.edit({ embeds: [embed] });
 
                if (rerollCount === rerollLimit) {
                    collector.stop();
                }
            } else {
                message.reply("You have reached the reroll limit.");
            }
        };
 
        collector.on('collect', handleReroll);
        collector.on('remove', handleReroll);
 
        collector.on('end', () => {
            sentMessage.reactions.removeAll().catch(error => console.error('Failed to clear reactions:', error));
        });
    },
};