const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/api/suggest", async (req, res) => {
  const { text, scenario, language } = req.body;
  if (!text || text.trim() === "") return res.status(400).json({ error: "No text provided" });

  const scenarioPrompts = {
    friend: "The user is talking to a close friend. Make the message warmer, more natural, and emotionally expressive.",
    interview: "The user is doing a job interview introduction. Make it confident, professional, concise, and impressive.",
    apology: "The user wants to apologize. Make it sincere, empathetic, non-defensive, and heartfelt.",
  };

  const systemPrompt = `You are Speakeasy, an expert AI communication coach.
${scenarioPrompts[scenario] || scenarioPrompts.friend}

IMPORTANT: The user is speaking in ${language || "English"}. You MUST reply in the SAME language: ${language || "English"}.

Rules:
- Keep the same meaning and intent
- Make it sound natural, not robotic
- Remove filler words
- Improve sentence structure and flow
- Return ONLY the improved message — no explanations, no quotes, no preamble`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Groq error:", err);
      return res.status(500).json({ error: "Groq API error", details: err });
    }

    const data = await response.json();
    const suggestion = data.choices[0].message.content.trim();
    res.json({ suggestion });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

app.post("/api/speak", async (req, res) => {
  const { text, voiceId } = req.body;
  if (!text || text.trim() === "") return res.status(400).json({ error: "No text provided" });

  try {
    const response = await fetch("https://api.murf.ai/v1/speech/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.MURF_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        voiceId: voiceId || "en-US-marcus",
        format: "MP3",
        channelType: "MONO",
        sampleRate: 24000,
        speed: 0,
        pitch: 0,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Murf error:", err);
      return res.status(500).json({ error: "Murf API error", details: err });
    }

    const data = await response.json();
    res.json({ audioUrl: data.audioFile });
  } catch (err) {
    console.error("Murf server error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    groq: !!process.env.GROQ_API_KEY,
    murf: !!process.env.MURF_API_KEY,
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🎙️  Speakeasy server running at http://localhost:${PORT}`);
  console.log(`   Groq key:  ${process.env.GROQ_API_KEY ? "✅ loaded" : "❌ missing"}`);
  console.log(`   Murf key:  ${process.env.MURF_API_KEY ? "✅ loaded" : "❌ missing"}\n`);
});
