const express = require("express");
const cors = require("cors");

function configureMiddleware(app) {
  app.use(cors({origin: "http://localhost:5173"}));
  app.use(express.json());
}

module.exports = configureMiddleware;
