# 🎙️ Speakeasy – AI Voice Communication Coach

> Voice-first AI coach that listens to how you speak and teaches you to speak better — powered by OpenAI + Murf AI.

---

## 📁 Project Structure

```
speakeasy/
├── server.js          ← Node.js backend (Express + OpenAI + Murf)
├── package.json       ← Dependencies
├── .env.example       ← API key template
├── .gitignore
└── public/
    └── index.html     ← Full frontend (HTML + CSS + JS)
```

---

## 🚀 Step-by-Step Setup Guide

### STEP 1 — Install Node.js
If you don't have Node.js installed:
- Go to https://nodejs.org
- Download and install the **LTS version**
- Verify: open terminal and run `node --version` (should show v18+)

---

### STEP 2 — Open Project in VS Code
1. Open VS Code
2. Go to **File → Open Folder**
3. Select the `speakeasy` folder
4. Open the integrated terminal: **Terminal → New Terminal**

---

### STEP 3 — Install Dependencies
In the VS Code terminal, run:

```bash
npm install
```

This installs: `express`, `cors`, `dotenv`, `nodemon`

---

### STEP 4 — Get Your API Keys

#### 🔑 OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Click **"Create new secret key"**
3. Copy it (you won't see it again!)

#### 🔑 Murf AI API Key
1. Go to https://murf.ai
2. Sign up / Log in
3. Go to **Dashboard → API → API Keys**
4. Generate a new key and copy it

---

### STEP 5 — Create Your .env File
In VS Code terminal:

```bash
# On Mac/Linux:
cp .env.example .env

# On Windows:
copy .env.example .env
```

Then open `.env` and fill in your real keys:

```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
MURF_API_KEY=your_murf_key_here
PORT=3000
```

> ⚠️ NEVER share this file or push it to GitHub!

---

### STEP 6 — Start the Server

```bash
npm start
```

You should see:
```
🎙️  Speakeasy server running at http://localhost:3000
   OpenAI key: ✅ loaded
   Murf key:   ✅ loaded
```

---

### STEP 7 — Open the App
Open your browser and go to:

```
http://localhost:3000
```

---

## 🎮 How to Use

1. **Choose a scenario** (Friend / Interview / Apology)
2. **Click the mic button** — it turns red when listening
3. **Speak naturally** — say something like *"um I kinda miss you and stuff"*
4. **Wait 2 seconds** — AI rewrites it instantly
5. **Click "Play with Murf Voice"** — hear the improved version spoken!
6. **Check your metrics** — sessions, clarity score, words refined

---

## 🛠️ Development Mode (auto-restart)

```bash
npm run dev
```

This uses `nodemon` — the server restarts automatically when you save changes.

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| `Cannot find module 'express'` | Run `npm install` |
| OpenAI key ❌ missing | Check `.env` file has correct key |
| Murf key ❌ missing | Check `.env` file has correct key |
| Mic not working | Use Google Chrome (required for Web Speech API) |
| `EADDRINUSE` port error | Change PORT in `.env` to 3001 |
| Audio not playing | Check browser allows audio autoplay |

---

## 🏆 Hackathon Demo Flow

Perfect demo script:

1. Select **"Talking to a Friend"**
2. Click mic, say: *"um I kinda wanted to like tell you I miss you and stuff you know"*
3. AI suggests: *"I've been thinking about you — I really miss spending time together."*
4. Click **"Play with Murf Voice"** → audience hears it in a beautiful voice 🎯
5. Show the **Clarity Score** and **History** cards

---

## 📦 Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Web Speech API)
- **Backend:** Node.js + Express
- **AI:** OpenAI GPT-4o-mini
- **Voice:** Murf AI Falcon TTS
- **No database needed** — all in-memory for demo

---

Built for **Murf AI Hackathon 2025** 🚀
