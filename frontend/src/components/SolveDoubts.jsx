import React from "react";
import { HelpCircle } from "lucide-react";

const SolveDoubts = () => {
  const doubts = [
    { id: 1, question: "How to submit the assignment?" },
    { id: 2, question: "What is the syllabus for unit test?" },
  ];

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle size={24} className="text-purple-500" />
        <h2 className="text-lg font-semibold">Student Doubts</h2>
      </div>
      {doubts.map((doubt) => (
        <div key={doubt.id} className="mb-3">
          <p className="text-gray-700 font-medium">{doubt.question}</p>
          <textarea
            placeholder="Reply..."
            className="w-full border p-2 rounded mt-1"
          ></textarea>
          <button className="mt-2 bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">
            Send Reply
          </button>
        </div>
      ))}
    </div>
  );
};

export default SolveDoubts;