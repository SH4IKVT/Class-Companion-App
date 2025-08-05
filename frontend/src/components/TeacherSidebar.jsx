import React from "react";
import {
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  MessageCircle,
  Megaphone,
  UserCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const TeacherSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="h-screen w-full md:w-64 bg-white sticky top-0 shadow-lg border-r border-gray-200 px-4 py-6 overflow-y-auto">
      <h2 className="text-xl font-bold text-blue-600 mb-6 text-center">Teacher Panel</h2>

      <nav className="space-y-4">
        <Link
          to="/teacher-dashboard"
          className={`flex items-center gap-3 font-medium px-3 py-2 rounded-lg ${
            isActive("/teacher-dashboard")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          <LayoutDashboard className="text-indigo-500" size={20} />
          Dashboard
        </Link>

        <Link
          to="/post-announcement"
          className={`flex items-center gap-3 font-medium px-3 py-2 rounded-lg ${
            isActive("/post-announcement")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          <Megaphone className="text-red-500" size={20} />
          Post Announcement
        </Link>

        <Link
          to="/post-assignment"
          className={`flex items-center gap-3 font-medium px-3 py-2 rounded-lg ${
            isActive("/post-assignment")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          <ClipboardList className="text-yellow-500" size={20} />
          Post Assignment
        </Link>

        <Link
          to="/post-notes"
          className={`flex items-center gap-3 font-medium px-3 py-2 rounded-lg ${
            isActive("/post-notes")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          <BookOpen className="text-green-500" size={20} />
          Post Notes
        </Link>

        <Link
          to="/solve-doubts"
          className={`flex items-center gap-3 font-medium px-3 py-2 rounded-lg ${
            isActive("/solve-doubts")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          <MessageCircle className="text-purple-500" size={20} />
          Solve Doubts
        </Link>

        <Link
          to="/teacher-profile"
          className={`flex items-center gap-3 font-medium px-3 py-2 rounded-lg ${
            isActive("/teacher-profile")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          <UserCircle className="text-pink-500" size={20} />
          Teacher Profile
        </Link>
      </nav>
    </aside>
  );
};

export default TeacherSidebar;