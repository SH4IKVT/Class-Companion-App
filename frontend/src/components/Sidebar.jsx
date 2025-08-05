import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`bg-gray-100 p-4 shadow-md h-screen fixed top-0 left-0 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 w-64`}
    >
      <h2 className="text-xl font-bold text-blue-700 mb-6">Dashboard</h2>

      <nav className="flex flex-col gap-4">
        <Link
          to="/student-dashboard/"
          className="hover:text-blue-600 font-medium"
        >
          ProfileCard
        </Link>
        <Link
          to="/student-dashboard/classNotes"
          className="hover:text-blue-600 font-medium"
        >
          ClassNotes
        </Link>
        <Link
          to="/student-dashboard/assignments"
          className="hover:text-blue-600 font-medium"
        >
          Assignments
        </Link>
        <Link
          to="/student-dashboard/announcements"
          className="hover:text-blue-600 font-medium"
        >
          Announcements
        </Link>
        <Link
          to="/student-dashboard/doubts"
          className="hover:text-blue-600 font-medium"
        >
          Doubts
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;