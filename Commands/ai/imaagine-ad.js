const { SlashCommandBuilder } = require('discord.js');
const { Prodia } = require("prodia.js");
const config = require("../../config.json");
const prodia = new Prodia(config.prodia);

module.exports = {
    voteRequired: true,
    data: new SlashCommandBuilder()
        .setName('imagine')
        .setDescription('Generate an image by AI')
        .addStringOption(o => o.setName("prompt").setDescription("Describe what you want to generate").setRequired(true))
        .addStringOption(o => o.setName("negative_prompt").setDescription("Provide a negative prompt for the AI").setRequired(false)),
    async execute(interaction) {
        const prompt = interaction.options.getString("prompt");
                const negativePrompt = interaction.options.getString("negative_prompt"); 
        const msg = await interaction.reply({
            content: "<:icon_clock:1106284486246813738> | Generating Images....",
            ephemeral: true
        });
        try {
            const generatedImages = await Promise.all([
                generateImage(prompt, negativePrompt),
                generateImage(prompt, negativePrompt),
                generateImage(prompt, negativePrompt),
                generateImage(prompt, negativePrompt)
            ]);

            // Send the four generated images in one message
            const imageAttachments = generatedImages.map((image, index) => ({
                name: `generated_image_${index + 1}.png`,
                attachment: image.imageUrl
            }));

            await interaction.followUp({
                content: "<:icons_Correct1:1106284384539127912> | Correctly generated images.",
                files: imageAttachments
            });
        } catch (error) {
            console.error(error);
            return msg.edit({ content: "<:icons_busy:1106284532799377418> | Error generating the images." });
        }
    }
};

async function generateImage(prompt, negativePrompt) {
    try {
        const generate = await prodia.generateImage({
        negative_prompt: negativePrompt ,
        prompt: prompt,
        model: "absolutereality_v181.safetensors [3d9d4d2b]",
        negative_prompt: "text, blur, duplicate, distorted",
        sampler: "DPM++ SDE Karras",
        cfg_scale: 19,
        steps: 30,
        aspect_ratio: "portrait"

  
        });

        while (generate.status !== "succeeded" && generate.status !== "failed") {
            await new Promise((resolve) => setTimeout(resolve, 350));
            const job = await prodia.getJob(generate.job);

            if (job.status === "succeeded") {
                return job;
            }
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}