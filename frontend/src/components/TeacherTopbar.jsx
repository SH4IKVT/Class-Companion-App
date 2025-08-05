import React from "react";
import { Menu } from "lucide-react";

const TeacherTopbar = ({ toggleSidebar }) => {
  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md px-4 py-3 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Sidebar toggle (for mobile only) */}
        <button
          className="md:hidden focus:outline-none text-white"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>

        {/* App name */}
        <h1 className="text-xl font-bold text-white">Class Companion</h1>
      </div>

      {/* Right side */}
      <div className="text-white font-medium text-sm sm:text-base">
        Welcome, <span className="font-semibold">Teacher</span>
      </div>
    </header>
  );
};

export default TeacherTopbar;