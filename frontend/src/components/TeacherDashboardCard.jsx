import React from "react";
import {
  ClipboardList,
  FileText,
  HelpCircle,
  Megaphone
} from "lucide-react";

const TeacherDashboardCard = () => {
  const cards = [
    {
      label: "Assignments",
      value: 10,
      icon: <ClipboardList size={32} className="text-purple-600" />,
    },
    {
      label: "Notes",
      value: 15,
      icon: <FileText size={32} className="text-green-600" />,
    },
    {
      label: "Doubts",
      value: 5,
      icon: <HelpCircle size={32} className="text-red-600" />,
    },
    {
      label: "Announcements",
      value: 2,
      icon: <Megaphone size={32} className="text-blue-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-2xl shadow text-center flex flex-col items-center justify-center space-y-2 hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          {card.icon}
          <h3 className="text-2xl font-bold text-blue-600">{card.value}</h3>
          <p className="text-gray-600">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

export default TeacherDashboardCard;