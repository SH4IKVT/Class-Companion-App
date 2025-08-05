import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "../lib/atom";


const Doubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [user, setUser] = useAtom(userAtom);
  const fetchDoubts = async () => {
    try {
      const res = await axios.get("http://localhost:4080/doubts", {
        withCredentials: true,
      });
      setDoubts(res.data);
    } catch (err) {
      console.error("Failed to load doubts", err);
    }
  };

  useEffect(() => {
    fetchDoubts();
  }, []);

  const handleAsk = async () => {
    if (!newQuestion.trim()) return;
    try {
      await axios.post(
        "http://localhost:4080/doubts",
        { question: newQuestion },
        { withCredentials: true }
      );
      setNewQuestion("");
      fetchDoubts();
    } catch (err) {
      console.error("Failed to submit doubt", err);
    }
  };

  const handleReply = async (id) => {
    const message = replyInputs[id];
    if (!message?.trim()) return;

    try {
      await axios.post(
        `http://localhost:4080/doubts/${id}/reply`,
        { message },
        { withCredentials: true }
      );
      setReplyInputs((prev) => ({ ...prev, [id]: "" }));
      fetchDoubts();
    } catch (err) {
      console.error("Failed to reply", err);
    }
  };
  useEffect(() => {
    console.log(user);
    
  },[user])
  return (
    <div className="max-w-4xl mx-auto p-4 bg-indigo-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Ask a Doubt</h1>

      
      <div className="space-y-6">
        {doubts.map((doubt) => (
          <div
            key={doubt._id}
            className="bg-white p-4 rounded shadow hover:bg-indigo-50"
          >
            <p className="text-gray-800 font-medium">
              {doubt.askedBy?.email || "Anonymous"} asked:
            </p>
            <p className="text-gray-700 mt-1">{doubt.question}</p>

            {/* Replies */}
            <div className="mt-3 pl-4 border-l-2 border-indigo-300 space-y-2">
              {doubt.replies?.map((reply, idx) => (
                <div key={idx} className="text-sm text-gray-700">
                  <span className="font-semibold text-indigo-600">
                    {reply.repliedBy?.email || "Anonymous"}:
                  </span>{" "}
                  {reply.message}
                </div>
              ))}
            </div>

            {/* Reply box */}
            <div className="mt-3 flex gap-2">
              <input
                className="flex-1 p-1 border rounded"
                placeholder="Write a reply..."
                value={replyInputs[doubt._id] || ""}
                onChange={(e) =>
                  setReplyInputs((prev) => ({
                    ...prev,
                    [doubt._id]: e.target.value,
                  }))
                }
              />
              <button
                className="bg-indigo-600 text-white px-3 py-1 rounded"
                onClick={() => handleReply(doubt._id)}
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doubts;
