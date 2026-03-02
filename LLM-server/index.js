import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { SYSTEM_PROMPT } from "./prompt.js";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userText = req.body.message;

    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2:3b",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userText },
        ],
        stream: false,
      }),
    });

    const data = await response.json();

    let parsed;
    try {
      parsed = JSON.parse(data.message.content);
    } catch {
      parsed = { domain: "unknown" };
    }

    res.json(parsed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ domain: "unknown" });
  }
});

app.listen(3001, () => {
  console.log("LLM controller running on http://localhost:3001");
});
