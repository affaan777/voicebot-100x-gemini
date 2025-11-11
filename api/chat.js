import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const { message } = req.body;

  const systemPrompt = `You are the voice assistant for Mohammed Affaan Shaikh. 
  Answer interview questions in 3-5 sentences, professional but natural. 
  Reference his AI Agent work (NL2SQL, GenAgent, Chanakya AI) and demonstrate reflective thinking.`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: systemPrompt + "\nUser: " + message }],
      },
    ],
  };

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GEMINI_API_KEY}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t generate a response.";

    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Server error." });
  }
}
