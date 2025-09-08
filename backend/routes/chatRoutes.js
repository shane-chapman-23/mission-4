const express = require("express");
const router = express.Router();
const {getOpenAIResponse} = require("../services/openaiService");

router.get("/", async (req, res) => {
  res.json({message: "you are connected via chatRoutes"});
});

router.post("/", async (req, res) => {
  const {messages} = req.body;
  if (!messages) return res.status(400).json({error: "No message provided"});

  try {
    const reply = await getOpenAIResponse(messages);
    res.json({reply});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to get response from OpenAI"});
  }
});

module.exports = router;
