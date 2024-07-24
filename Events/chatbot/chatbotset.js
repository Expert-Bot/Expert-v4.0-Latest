const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const aiSchema = require("../../Models/chatbot");

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyDLLnLAjHCSCMGFpOFMcWOIL2LwcQZMYQI";

const genAI = new GoogleGenerativeAI(API_KEY, { userLocation: 'pakistan' }); // Specify the user location
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

module.exports = {
  name: "messageCreate",
  async execute(message) {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Check if chatbot is enabled for this channel
    const data = await aiSchema.findOne({
      Guild: message.guild.id,
      Channel: message.channel.id,
    });

    if (data) {
      const parts = [{ text: message.content }];

      try {
        const result = await model.generateContent({
          contents: [{ role: "user", parts }],
          generationConfig,
          safetySettings,
        });

        const response = result.response;
        const generatedText = response.text();

        // Send the generated text to the Discord channel
        message.channel.send(generatedText);
      } catch (error) {
        console.error("Error generating content:", error.message);
      }
    }
  },
};
