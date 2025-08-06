import {
  Home,
  User,
  BookOpen,
  ClipboardList,
  Megaphone,
  HelpCircle,
  Smile
} from 'lucide-react';

import ProfileCard from "../components/ProfileCard"; 
import Announcements from "../components/Announcements";
import ClassNotes from "../components/ClassNotes";
import Assignments from "../components/Assignments";
import Doubts from "../components/Doubts"; 
import DashboardCards from "../components/DashboardCards";
import { useEffect } from 'react';

const StudentDashboard = () => {
   
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full h-screen  md:w-3/4 p-6 space-y-6">
          <ProfileCard/>
          <DashboardCards />
          {/* <div className="grid md:grid-cols-2 gap-4">
            <Announcements />
            <ClassNotes />
            <Assignments />
            <Doubts />
          </div> */}
        </div>


      {/* Footer */}
      <footer className=" text-black py-3 text-center text-sm shadow-inner">
        © {new Date().getFullYear()} Class Companion. All rights reserved.
      </footer>
        </div>
  );
};

export default StudentDashboard;