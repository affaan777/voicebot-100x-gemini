import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [listening, setListening] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recog = new SpeechRecognition();
    recog.lang = 'en-US';
    recog.onresult = (e) => {
      const text = e.results[0][0].transcript;
      addMessage('user', text);
      sendToServer(text);
    };
    recog.onend = () => setListening(false);
    recognitionRef.current = recog;
  }, []);

  function addMessage(role, text) {
    setConversation((c) => [...c, { role, text }]);
  }

  async function sendToServer(text) {
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      addMessage('bot', data.reply);
      speak(data.reply);
    } catch (e) {
      addMessage('bot', 'Error connecting to server.');
    }
    setLoading(false);
  }

  function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    window.speechSynthesis.speak(utter);
  }

  const handleMic = () => {
    if (!recognitionRef.current) return alert('Speech recognition not supported!');
    setListening(true);
    recognitionRef.current.start();
  };

  return (
    <div className="container">
      <h1>100x Voicebot — Gemini Edition</h1>
      <button onClick={handleMic}>{listening ? 'Listening...' : '🎤 Speak'}</button>

      <div className="chat">
        {conversation.map((m, i) => (
          <div key={i} className={m.role}>
            <b>{m.role}:</b> {m.text}
          </div>
        ))}
        {loading && <p>Thinking...</p>}
      </div>
    </div>
  );
}
