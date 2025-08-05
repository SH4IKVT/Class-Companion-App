import React from "react";
import { Megaphone } from "lucide-react"; // import icon

const Announcements = () => {
  const data = [
    { title: "Mid Sem Exams from 20th Aug", date: "2025-07-30" },
    { title: "Classroom shifted to Block B", date: "2025-07-28" },
  ];

  return (
    <div className="bg-white p-4 shadow rounded-2xl">
      {/* Heading with Icon */}
      <div className="flex items-center space-x-2 mb-3">
        <Megaphone className="text-yellow-500" size={24} />
        <h2 className="text-xl font-semibold">Announcements</h2>
      </div>

      {/* Announcement List */}
      <ul className="space-y-3">
        {data.map((a, i) => (
          <li
            key={i}
            className="border-b pb-2 hover:bg-gray-50 rounded-md transition-all cursor-pointer px-2"
          >
            <p className="font-medium">{a.title}</p>
            <p className="text-sm text-gray-600">Date: {a.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;