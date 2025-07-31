// import { useState } from "react";

// export default function Doubts() {
//   const [doubt, setDoubt] = useState('');
//   const [submitted, setSubmitted] = useState(false);

//   // 🔹 Doubts array: could come from a backend later
//   const [doubts, setDoubts] = useState([
//     {
//       question: "What is the difference between var, let and const?",
//       askedBy: "Student A",
//       reply: "let and const are block scoped. const cannot be reassigned.",
//       answeredBy: "Teacher"
//     },
//     {
//       question: "How to implement recursion in JavaScript?",
//       askedBy: "Student B",
//       reply: "",
//       answeredBy: ""
//     }
//   ]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newDoubt = {
//       question: doubt,
//       askedBy: "You",
//       reply: "",
//       answeredBy: ""
//     };
//     setDoubts([...doubts, newDoubt]);
//     setSubmitted(true);
//     setDoubt('');
//     setTimeout(() => setSubmitted(false), 2000);
//   };

//   return (
//     <div className="min-h-screen bg-indigo-100 p-6 text-gray-800">
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
//         <h1 className="text-2xl font-bold mb-4 text-center">📘 Doubts Forum</h1>

//         {/* Form */}
//         <form onSubmit={handleSubmit}>
//           <textarea
//             className="w-full border border-indigo-200 rounded p-3 bg-indigo-50 mb-3 placeholder:text-indigo-400"
//             placeholder="Type your doubt here..."
//             rows={4}
//             value={doubt}
//             onChange={(e) => setDoubt(e.target.value)}
//             required
//           ></textarea>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
//           >
//             Submit Doubt
//           </button>
//           {submitted && (
//             <p className="text-green-600 mt-2 text-center">Your doubt was submitted!</p>
//           )}
//         </form>

//         {/* Doubts List */}
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-3">📜 Previous Doubts</h2>
//           {doubts.map((item, index) => (
//             <div key={index} className="border-l-4 border-indigo-400 bg-indigo-50 p-4 mb-4 rounded">
//               <p className="font-semibold">🧑‍🎓 {item.askedBy} asked:</p>
//               <p className="ml-4 mb-2 text-gray-700">{item.question}</p>
//               {item.reply ? (
//                 <>
//                   <p className="font-semibold text-green-700">👩‍🏫 {item.answeredBy} replied:</p>
//                   <p className="ml-4 text-gray-700">{item.reply}</p>
//                 </>
//               ) : (
//                 <p className="ml-4 italic text-gray-500">⏳ Awaiting response...</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";

// export default function Doubts() {
//   const [newDoubt, setNewDoubt] = useState('');
//   const [doubts, setDoubts] = useState([
//     {
//       id: 1,
//       question: "Can you explain closures in JavaScript?",
//       askedBy: "Student A",
//       reply: "Sure! Closures let you access outer function's scope from an inner function.",
//       answeredBy: "Teacher"
//     },
//     {
//       id: 2,
//       question: "What's the difference between == and ===?",
//       askedBy: "Student B",
//       reply: "",
//       answeredBy: ""
//     }
//   ]);

//   const [teacherReplies, setTeacherReplies] = useState({});

//   const submitDoubt = (e) => {
//     e.preventDefault();
//     const newEntry = {
//       id: doubts.length + 1,
//       question: newDoubt,
//       askedBy: "You",
//       reply: "",
//       answeredBy: ""
//     };
//     setDoubts([...doubts, newEntry]);
//     setNewDoubt('');
//   };

//   const handleReplyChange = (id, value) => {
//     setTeacherReplies({ ...teacherReplies, [id]: value });
//   };

//   const submitReply = (id) => {
//     const updatedDoubts = doubts.map((doubt) =>
//       doubt.id === id
//         ? {
//             ...doubt,
//             reply: teacherReplies[id],
//             answeredBy: "Teacher"
//           }
//         : doubt
//     );
//     setDoubts(updatedDoubts);
//     setTeacherReplies({ ...teacherReplies, [id]: '' });
//   };

//   return (
//     <div className="min-h-screen bg-indigo-100 p-6 text-gray-800">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         {/* <h1 className="text-2xl font-bold mb-6 text-center">💬 Class Doubt Chat</h1> */}

//         <div className="space-y-6 max-h-[500px] overflow-y-auto px-1">
//           {doubts.map((doubt) => (
//             <div key={doubt.id} className="space-y-2">
//               {/* Student Message */}
//               <div className="flex">
//                 <div className="bg-indigo-200 text-gray-800 px-4 py-2 rounded-lg rounded-tl-none max-w-[75%]">
//                   <p className="text-sm font-semibold">{doubt.askedBy}:</p>
//                   <p>{doubt.question}</p>
//                 </div>
//               </div>

//               {/* Teacher Reply */}
//               {doubt.reply ? (
//                 <div className="flex justify-end">
//                   <div className="bg-green-100 text-gray-800 px-4 py-2 rounded-lg rounded-tr-none max-w-[75%]">
//                     <p className="text-sm font-semibold">{doubt.answeredBy}:</p>
//                     <p>{doubt.reply}</p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex justify-end gap-2 items-center">
//                   <input
//                     type="text"
//                     className="border rounded px-3 py-1 w-full max-w-xs text-sm"
//                     placeholder="Reply as teacher..."
//                     value={teacherReplies[doubt.id] || ''}
//                     onChange={(e) => handleReplyChange(doubt.id, e.target.value)}
//                   />
//                   <button
//                     onClick={() => submitReply(doubt.id)}
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
//                   >
//                     Send
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* New Doubt Entry */}
//         <form onSubmit={submitDoubt} className="mt-6 flex gap-2">
//           <input
//             type="text"
//             className="w-full border p-3 rounded"
//             placeholder="Ask a new doubt"
//             value={newDoubt}
//             onChange={(e) => setNewDoubt(e.target.value)}
//             required
//           />
//           <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded">
//             Ask
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';

const Doubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [newDoubt, setNewDoubt] = useState("");

  // 🔹 useEffect to fetch doubts on page load
  useEffect(() => {
    fetch("http://localhost:4080/api/doubts/my", {
      method: "GET",
      credentials: "include", // includes cookies for authentication
    })
      .then((res) => res.json())
      .then((data) => {
        setDoubts(data);
      })
      .catch((err) => console.error("Error loading doubts:", err));
  }, []);

  // 🔸 Function to handle new doubt submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4080/api/doubts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ question: newDoubt }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDoubts([data, ...doubts]); // show the new one immediately
        setNewDoubt("");
      })
      .catch((err) => console.error("Failed to submit doubt:", err));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Your Doubts</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newDoubt}
          onChange={(e) => setNewDoubt(e.target.value)}
          placeholder="Ask a doubt..."
          className="flex-1 p-2 border border-indigo-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Ask
        </button>
      </form>

      <div className="space-y-4">
        {doubts.map((doubt) => (
          <div key={doubt._id} className="p-4 bg-indigo-100 rounded shadow">
            <p className="text-gray-800 font-medium">Q: {doubt.question}</p>
            {doubt.reply && (
              <p className="text-sm text-indigo-700 mt-2">👨‍🏫 Teacher: {doubt.reply}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doubts;
