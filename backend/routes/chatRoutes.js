const express = require("express");
const router = express.Router();

const {getOpenAIResponse} = require("../services/openaiService");

const {
  updateHistory,
  getHistory,
  getFilteredHistory,
  clearHistory,
} = require("../history/chatHistory");

//================Get chat history===================
router.get("/", async (req, res) => {
  res.json({history: getFilteredHistory()});
});

//==================Post message=====================
router.post("/", async (req, res) => {
  const {message} = req.body;
  if (message == null)
    return res.status(400).json({error: "No message provided"});

  try {
    // Only add to history if not empty
    if (message.trim() !== "") updateHistory("user", message);

    // Always call AI, even for empty initial message
    await getAIReply();
    res.json({history: getFilteredHistory()});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to get response from OpenAI"});
  }
});

async function getAIReply() {
  const reply = await getOpenAIResponse(getHistory());
  updateHistory("assistant", reply);
  return reply;
}

//==============Summarize history====================
router.post("/summarize", async (req, res) => {
  try {
    // Only summarizes conversation messages and previous summary message
    const messagesToSummarize = getMessagesToSummarize(getHistory());

    if (!messagesToSummarize.length)
      return res.json({summary: "No conversation to summarize yet."});

    const summary = await generateSummary(messagesToSummarize);
    clearHistory();
    updateHistory(
      "system",
      `Here is a summary of the conversations so far: ${summary}`
    );

    res.json({summary});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to summarize chat history"});
  }
});

async function generateSummary(messages) {
  const systemPrompt = {
    role: "system",
    content: `You are an AI assistant. Summarize the following conversation clearly, only using the content of the conversation.
        Update the current car if needed. Also take note in the summary of any car they are considering buying.
        This is how it should be structured:
          
        current car:
          Make: ""
          Model: ""
          Year: ""
            
        summary: ""`,
  };

  return await getOpenAIResponse([systemPrompt, ...messages]);
}

//=============Helper Functions=================
function getMessagesToSummarize(history) {
  return history.filter(
    (msg) =>
      msg.content && (msg.role !== "system" || msg.content.includes("summary"))
  );
}

module.exports = router;
