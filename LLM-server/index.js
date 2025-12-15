import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2:3b",
        messages: [{ role: "user", content: "tell me about yourself and specs and maker" }],
        stream: false,
      }),
    });

    const data = await response.json();
    res.json(data.message);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "LLM call failed" });
  }
});

app.listen(3001, () => {
  console.log("LLM server running on http://localhost:3001");
});
