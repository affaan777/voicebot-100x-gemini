# 100x Voicebot — Gemini Edition 🎤

An interactive voice-based chatbot built using **React (frontend)** and **Google Gemini API (backend)**.
No API key entry needed for testers — it runs entirely server-side via environment variables.

### 🚀 Live Demo
👉 https://voicebot-100x-gemini.vercel.app (replace with your deployed link)

### 🧠 Tech Stack
- React + Web Speech API (Speech Recognition + Speech Synthesis)
- Google Gemini 2.5 Flash (via AI Studio API)
- Vercel Serverless Function `/api/chat`
- No manual API key input required

### 🧩 Setup (for you)
1. Clone repo
2. `npm install`
3. Add environment variable `GEMINI_API_KEY` in Vercel → Settings → Environment Variables
4. `npm run build` and deploy to Vercel
