require("dotenv").config();

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/test", (req, res) => {
  res.json({message: "You are connected"});
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
