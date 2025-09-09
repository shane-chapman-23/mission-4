const express = require("express");
const router = express.Router();
const {getOpenAIResponse} = require("../services/openaiService");
const {updateHistory, getHistory} = require("../history/chatHistory");

router.get("/", async (req, res) => {
  res.json({message: "you are connected via chatRoutes"});
});

router.post("/", async (req, res) => {
  const {message} = req.body;
  if (!message) return res.status(400).json({error: "No message provided"});

  try {
    updateHistory("user", message);

    const chatHistory = getHistory();
    const reply = await getOpenAIResponse(chatHistory);

    updateHistory("assistant", reply);

    //Filters messages to remove system prompt before sending to frontend
    const filteredMessages = getHistory().filter(
      (msg) => msg.role !== "system"
    );

    res.json({history: filteredMessages});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to get response from OpenAI"});
  }
});

module.exports = router;
