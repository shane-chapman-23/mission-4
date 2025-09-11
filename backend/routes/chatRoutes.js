const express = require("express");
const router = express.Router();

const {getOpenAIResponse} = require("../services/openaiService");

const {
  updateHistory,
  getHistory,
  filterHistory,
  clearHistory,
} = require("../history/chatHistory");

// Get chat history
router.get("/", async (req, res) => {
  res.json({history: getFilteredHistory()});
});

//Post message
router.post("/", async (req, res) => {
  const {message} = req.body;

  // Only reject undefined/null, allow empty string
  if (message === null) {
    return res.status(400).json({error: "No message provided"});
  }

  try {
    // Only add to history if it’s not empty
    if (message.trim() !== "") updateHistory("user", message);

    const reply = await getOpenAIResponse(getHistory());
    updateHistory("assistant", reply);
    res.json({history: getFilteredHistory()});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to get response from OpenAI"});
  }
});

//Summarize history
router.post("/summarize", async (req, res) => {
  try {
    const chatHistory = getHistory();

    // Only summarize actual conversation messages
    const messagesToSummarize = chatHistory.filter((msg) => msg.content);

    if (messagesToSummarize.length === 0) {
      return res.json({summary: "No conversation to summarize yet."});
    }

    // Generate summary
    const summary = await getOpenAIResponse([
      {
        role: "system",
        content: `You are an AI assistant. Summarize the following conversation briefly and clearly, only using the content of the conversation. Update the current car if needed. 
          This is how it should be structured:
          
          current car:
            Make: ""
            Model: ""
            Year: ""
            
          summary: ""`,
      },
      ...messagesToSummarize,
    ]);

    // Clear ALL history before saving the summary
    clearHistory();

    // Add a single summary message
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

//Helpers

function getFilteredHistory() {
  return filterHistory(getHistory());
}

module.exports = router;
