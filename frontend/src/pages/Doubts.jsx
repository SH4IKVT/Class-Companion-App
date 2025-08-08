import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../lib/atom";
import Chatbox from "./Chatbot";

const Doubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [newDoubt, setNewDoubt] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
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
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1] to-[#FFE0B2] p-12">
      <h1 className="text-5xl font-extrabold text-[#F98F30] mb-8 text-center">
        Doubts & Discussions
      </h1>

      {/* Ask a Doubt Form */}
      {user?.type === "student" && (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-12 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-[#FF8F00]">Ask a New Doubt</h2>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={newDoubt}
              onChange={(e) => setNewDoubt(e.target.value)}
              className="flex-1 text-black border border-gray-300 rounded-xl p-2"
              placeholder="Type your doubt..."
              required
            />
            <button
              type="submit"
              className="bg-[#FB8C00] text-white px-6 py-2 rounded-xl hover:bg-[#EF6C00]"
            >
              Ask
            </button>
          </form>
        </div>
      )}

      {/* Doubts List */}
      <div className="space-y-8 max-w-3xl mx-auto">
        {doubts.map((doubt) => (
          <div key={doubt._id} className="bg-white shadow-md p-6 rounded-xl space-y-4">
            {/* Question */}
            <div>
              <p className="text-[#FB8C00] font-semibold">
                🧑‍🎓 {doubt.askedBy?.username || doubt.askedBy?.email || "Student"} asked:
              </p>
              <p className="text-gray-800 mt-1">{doubt.question}</p>
            </div>

            {/* Replies */}
            {doubt.replies?.map((reply, idx) => (
              // <div key={idx} className="ml-4 bg-[#E0F2F1] p-3 rounded-lg shadow border-l-4 border-[#43A047]">
              <div key={idx} className="ml-4 bg-[#F1F8E9] p-3 rounded-lg shadow border-l-4 border-[#43A047]">
                <p className="text-[#388E3C] font-semibold">
                  👤 {reply.repliedBy?.username || reply.repliedBy?.email || "User"} replied:
                </p>
                <p className="text-gray-800">{reply.message}</p>
              </div>
            ))}

            {/* Reply Box (Teacher only) */}
            {user?.type === "teacher" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleReply(doubt._id);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  placeholder="Reply to this doubt..."
                  className="flex-1 border border-gray-300 rounded p-2 text-black"
                  value={replyInputs[doubt._id] || ""}
                  onChange={(e) => handleReplyChange(doubt._id, e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#43A047] text-white px-4 rounded hover:bg-[#388E3C]"
                >
                  Reply
                </button>
              </form>
            )}
          </div>
        ))}
      </div>

      {/* Chatbot FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowBot(true)}
          className="bg-[#FF8F00] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-[#EF6C00]"
          title="Ask Chatbot"
        >
        🤖
        </button>
      </div>

      {showBot && <Chatbox onClose={() => setShowBot(false)} />}
    </div>
  );
};

export default Doubts;