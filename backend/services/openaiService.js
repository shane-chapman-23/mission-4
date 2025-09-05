require("dotenv").config();

const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getOpenAIResponse(message) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: message}],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}

module.exports = {getOpenAIResponse};
