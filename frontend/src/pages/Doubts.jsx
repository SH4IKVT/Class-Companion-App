import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from '../lib/atom'
import Chatbox from "./Chatbot";

const Doubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [newDoubt, setNewDoubt] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [showBot, setShowBot] = useState(false);

  const [user] = useAtom(userAtom);
  const fetchDoubts = async () => {
    try {
      const res = await fetch("http://localhost:4080/api/doubts", {
        credentials: "include",
      });
      const data = await res.json();
      setDoubts(data);
    } catch (err) {
      console.error("Error loading doubts:", err);
    }
  };

  useEffect(() => {
    fetchDoubts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4080/api/doubts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ question: newDoubt }),
    });
    const data = await res.json();
    setDoubts([data, ...doubts]);
    setNewDoubt("");
  };

  const handleReplyChange = (id, value) => {
    setReplyInputs({ ...replyInputs, [id]: value });
  };

  const handleReply = async (id) => {
    const message = replyInputs[id];
    if (!message?.trim()) return;

    const res = await fetch(`http://localhost:4080/api/doubts/${id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ message }),
    });

    const updated = await res.json();
    setDoubts((prev) =>
      prev.map((d) => (d._id === updated._id ? updated : d))
    );
    setReplyInputs({ ...replyInputs, [id]: "" });
  };

  return (
    <div className="min-h-screen bg-indigo-100 px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          💬 Doubts Chat
        </h2>

        {/* New Question */}
        {
          user?.type === "student" && (
            <div className="border border-black/10 p-4 px-6 mb-6 rounded-xl bg-zinc-800/5 shadow-xl shadow-zinc-500/20">
              <h6 className="text-2xl font-bold mb-4 text-center text-gray-800">Ask a Doubt</h6>
              <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newDoubt}
                  onChange={(e) => setNewDoubt(e.target.value)}
                  className="flex-1 text-black border border-black rounded-xl ho p-2"
                  placeholder="Type your doubt..."
                  required
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Ask
                </button>
              </form>
            </div>
          )
        }

        {/* Doubts + Replies */}
        <div className="flex flex-col gap-6 pr-2">
          {doubts.map((doubt) => (
            <div key={doubt._id} className="space-y-3">
              {/* Question */}
              <div className="flex justify-start">
                <div className="bg-indigo-200 px-4 py-2 rounded-xl rounded-tl-none max-w-[75%] shadow text-gray-800">
                  <p className="text-sm font-semibold text-indigo-700">
                    🧑‍🎓 {doubt.askedBy?.email || "Student"}:
                  </p>
                  <p>{doubt.question}</p>
                </div>
              </div>

              {/* Replies */}
              {doubt.replies?.map((reply, idx) => (
                <div key={idx} className="flex justify-end">
                  <div className="bg-green-100 px-4 py-2 rounded-xl rounded-tr-none max-w-[75%] shadow text-gray-800">
                    <p className="text-sm font-semibold text-green-700">
                      👤 {reply.repliedBy?.email || "Teacher"}:
                    </p>
                    <p>{reply.message}</p>
                  </div>
                </div>
              ))}

              {/* Reply input */}
              {
                user?.type === "teacher" && (
                                <form action="" onSubmit={e=>e.preventDefault()}>

              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Reply to this doubt..."
                  className="flex-1 border rounded px-3 py-1 text-gray-800"
                  value={replyInputs[doubt._id] || ""}
                  onChange={(e) =>
                    handleReplyChange(doubt._id, e.target.value)
                  }
                  />
                <button
                  onClick={() => handleReply(doubt._id)}
                  className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
                  >
                  Reply
                </button>
              </div>
                  </form>
                )
              }
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowBot(true)}
          className="!bg-indigo-600 !text-white !rounded-full w-14 h-14 !flex !items-center !justify-center !shadow-lg !hover:bg-indigo-700"
          title="Ask Chatbot"
        >
          🤖
        </button>
      </div>

      {/* Chatbox Modal */}
      {showBot && <Chatbox onClose={() => setShowBot(false)} />}
    </div>

  );
};

export default Doubts;

