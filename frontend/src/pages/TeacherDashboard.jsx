 import React from "react";
import TeacherTopbar from "../components/TeacherTopbar";
import TeacherSidebar from "../components/TeacherSidebar";
import TeacherProfileCard from "../components/TeacherProfileCard";
import TeacherDashboardCard from "../components/TeacherDashboardCard";
import PostAssignment from "../components/PostAssignment";
import PostAnnouncement from "../components/PostAnnouncement";
import SolveDoubts from "../components/SolveDoubts";
import PostNotes from "../components/PostNotes";

const TeacherDashboard = () => {

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      {/* Topbar */}
      {/* <TeacherTopbar /> */}

      <div className="flex flex-col h-screen items-center justify-center md:flex-row flex-1">
        {/* Sidebar */}
        {/* <TeacherSidebar /> */}

        {/* Main Content */}
        <main className="w-full  md:w-3/4 p-6 space-y-6">
          <TeacherProfileCard />
          <TeacherDashboardCard />
          {/* <div className="grid md:grid-cols-2 gap-4">
            <PostAnnouncement />
            <PostAssignment />
            <PostNotes />
            <SolveDoubts />
          </div> */}
        </main>
      </div>

      {/* Footer */}
      <footer className="text-black py-3 text-center text-sm shadow-inner">
        © {new Date().getFullYear()} Class Companion. All rights reserved.
      </footer>
    </div>
  );
};

export default TeacherDashboard;