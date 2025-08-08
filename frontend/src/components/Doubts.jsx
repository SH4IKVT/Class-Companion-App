import React, { useState } from "react";
import { HelpCircle } from "lucide-react"; // icon import

const DoubtSection = () => {
  const [doubts, setDoubts] = useState([
    {
      question: "What is a semaphore?",
      date: "2025-07-25",
      status: "Unresolved",
    },
    {
      question: "Difference between SQL and NoSQL?",
      date: "2025-07-24",
      status: "Resolved",
    },
  ]);

  const [newDoubt, setNewDoubt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newDoubt.trim() === "") return;

    const newEntry = {
      question: newDoubt,
      date: new Date().toISOString().split("T")[0],
      status: "Unresolved",
    };

    setDoubts([newEntry, ...doubts]);
    setNewDoubt("");
  };

  return (
    <div className="bg-white p-4 shadow rounded-2xl mb-4">
      {/* Title with icon */}
      <div className="flex items-center space-x-2 mb-3">
        <HelpCircle className="text-blue-500" size={24} />
        <h2 className="text-xl font-semibold">Ask a Doubt</h2>
      </div>

      {/* Doubt input box */}
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newDoubt}
          onChange={(e) => setNewDoubt(e.target.value)}
          placeholder="Type your doubt here..."
          className="w-full p-3 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Doubt
        </button>
      </form>

      {/* Previous doubts list */}
      <h3 className="text-lg font-semibold mb-2">Previous Doubts</h3>
      <ul className="space-y-3">
        {doubts.map((item, index) => (
          <li
            key={index}
            className="border p-3 rounded-lg hover:shadow transition"
          >
            <p className="font-medium">{item.question}</p>
            <p className="text-sm text-gray-600">
              Date: {item.date} | Status:{" "}
              <span
                className={`font-semibold ${
                  item.status === "Resolved"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.status}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoubtSection;