import React from "react";
import {
  User,
  School,
  Mail,
  BookOpen
} from "lucide-react";

const TeacherProfileCard = () => {
  return (
    <div className="bg-white shadow p-4 rounded-2xl w-full">
      <h2 className="text-lg font-semibold mb-4 text-blue-700 flex items-center gap-2">
        <User className="text-blue-500" size={20} />
        Teacher Profile
      </h2>

      <div className="space-y-3 text-gray-700 text-sm">
        <p className="flex items-center gap-2">
          <User className="text-purple-600" size={18} />
          <span><strong>Name:</strong> Dr. Sharma</span>
        </p>
        <p className="flex items-center gap-2">
          <School className="text-green-600" size={18} />
          <span><strong>Department:</strong> Computer Science</span>
        </p>
        <p className="flex items-center gap-2">
          <Mail className="text-red-600" size={18} />
          <span><strong>Email:</strong> sharma@example.com</span>
        </p>
        <p className="flex items-center gap-2">
          <BookOpen className="text-yellow-600" size={18} />
          <span><strong>Subject:</strong> DBMS</span>
        </p>
      </div>
    </div>
  );
};

export default TeacherProfileCard;