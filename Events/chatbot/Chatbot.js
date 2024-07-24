const axios = require("axios");
const ChatbotThreadData = require("../../Schemas/ChatbotThreadData");
const ChatbotData = require("../../Schemas/Chatbot");
const { Configuration, OpenAIApi } = require("openai"); // Move the import statements to the top
const natural = require("natural");
const kmeans = require("node-kmeans");
const stringSimilarity = require("string-similarity");
const { dataset, responseMap } = require("../../Systems/Dataset");

module.exports = {
  name: "messageCreate",

  async execute(message) {
    try {
      if (!message.author || !message.author.id || message.author.bot || !message.guild) {
        return;
      }

      const Data = await ChatbotThreadData.findOne({ UserID: message.author.id });
      const ChatbotDatas = await ChatbotData.findOne({ GuildID: message.guild.id });

      if (!ChatbotDatas || !Data) {
        return;
      }

      if (message.channel.id !== Data.Thread) {
        return;
      }

      if (Data.Type === "BrainShop") {
        const res = await axios.get(
          `http://api.brainshop.ai/get?bid=172277&key=ZEEuyFpmJH56JOAE&uid=1&msg=${encodeURIComponent(
            message.content
          )}`
        );

        if (!res.data.cnt) {
          message.reply("I am sorry, Can you repeat it again?");
        } else {
          await message.reply({
            content: `${res.data.cnt}`,
          });
        }
      } else if (Data.Type === "ChatGPT") {
        const configuration = new Configuration({
          organization: process.env.OPENAI_ORG,
          apiKey: "sk-proj-lYQB6Zk0shWO8Os1ki4KT3BlbkFJCQYf9bfPeW0UBbnioJ8k"
        });
        const openai = new OpenAIApi(configuration);

        const gptResponse = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Hey give me a response me for this : ${message.content}`,
          temperature: 0.5,
          max_tokens: 200,
          top_p: 1.0,
          frequency_penalty: 0.5,
          presence_penalty: 0.0,
        });

        if (!gptResponse?.data?.choices?.[0]?.text) {
          message.reply("I am sorry, Can you repeat it again?");
        } else {
          message.reply(`${gptResponse.data.choices[0].text}`);
        }
      } else if (Data.Type === "System") {
        const tfidf = new natural.TfIdf();
        dataset.forEach((item) => {
          tfidf.addDocument(item);
        });

        const datasetNumeric = tfidf.documents.map((doc) => {
          return tfidf.listTerms(doc).map((item) => item.tfidf);
        });

        const k = 3;
        kmeans.clusterize(datasetNumeric, { k }, (err, res) => {
          if (err) {
            console.error(err);
          } else {
            const match = stringSimilarity.findBestMatch(message.content, dataset);
            const inputIndex = match.bestMatchIndex;

            if (inputIndex === -1) {
              console.log("Response was not found in the dataset");
              message.reply("I am sorry, I didn't get it");
            } else {
              const clusterIndex = res[0]?.clusterInd?.[inputIndex];

              if (clusterIndex !== undefined) {
                const output1 = responseMap[clusterIndex];
                const response = output1[Math.floor(Math.random() * output1.length)];

                if (!response) {
                  message.reply("I am sorry, Can you repeat it again?");
                } else {
                  message.reply(response);
                }
              }
            }
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  },
};
