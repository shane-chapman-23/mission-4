require("dotenv").config();

const express = require("express");
const configureMiddleware = require("./config/middleware");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

configureMiddleware(app);

app.use("/chat", chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
