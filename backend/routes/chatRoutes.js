const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({message: "you are connected via chatRoutes"});
});

module.exports = router;
