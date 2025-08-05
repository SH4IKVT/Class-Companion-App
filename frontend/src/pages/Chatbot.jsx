import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function Chatbox({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [currInp, setCurInp] = useState('');

  const api_key = "qSGjMxkXxC2uqkWUGVi98EvVghZLdmniJjnep8n2";

  const getAnswer = async (userInput) => {
    try {
      const response = await fetch('https://api.cohere.ai/v1/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${api_key}`,
          'Content-Type': 'application/json',
          'Cohere-Version': '2023-05-18'
        },
        body: JSON.stringify({
          message: userInput,
          max_tokens: 150,
          temperature: 0.7,
        })
      });

      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

      const result = await response.json();
      const botMsg = result.text.trim();

      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: botMsg, time: new Date().toLocaleString() }
      ]);
    } catch (err) {
      console.error("AI Response Error:", err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: "Sorry, I couldn't process that.",
          time: new Date().toLocaleString(),
        }
      ]);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!currInp.trim()) return;

    const userMessage = {
      sender: 'user',
      text: currInp,
      time: new Date().toLocaleString(),
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = currInp;
    setCurInp('');
    await getAnswer(userInput);
  };

  return (
    <div className="fixed bottom-0 right-0 md:w-1/2 w-full h-[80vh] bg-white z-50 shadow-2xl flex flex-col border-l border-t rounded-tl-2xl">
      {/* Header */}
      <div className="flex justify-between items-center bg-indigo-600 text-white px-4 py-3 rounded-tl-2xl">
        <h3 className="text-lg font-semibold">🤖 Doubt Assistant</h3>
        <button onClick={onClose} className="text-xl hover:text-red-300 border !p-1 !px-3 !rounded-xl !bg-transparent">✖</button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg">No messages yet</p>
            <p className="text-sm">Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`px-4 py-2 max-w-[80%] rounded-xl shadow-sm break-words ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white self-end ml-auto'
                  : 'bg-gray-200 text-black self-start mr-auto'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <small className="block opacity-70 text-xs mt-1">{msg.time}</small>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="border-t flex items-center gap-2 p-4 bg-white">
        <input
          type="text"
          value={currInp}
          onChange={(e) => setCurInp(e.target.value)}
          placeholder="Write your doubt here..."
          required
          className="flex-1 px-4 py-2 border text-black rounded-xl focus:outline-none focus:ring-2 border-gray-400 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl shadow-md"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}
