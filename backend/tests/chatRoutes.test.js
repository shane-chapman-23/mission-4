const request = require("supertest");
const express = require("express");
const chatRoutes = require("../routes/chatRoutes");

const app = express();
app.use("/chat", chatRoutes);

describe("GET /chat", () => {
  it("should return a test message", async () => {
    const res = await request(app).get("/chat");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "you are connected via chatRoutes"
    );
  });
});
