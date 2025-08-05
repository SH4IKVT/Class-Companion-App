import React, { useEffect } from "react";
import {
  ClipboardList,
  FileText,
  HelpCircle,
  Megaphone
} from "lucide-react";
import axios from "axios";

const TeacherDashboardCard = () => {
   const [data, setData] = React.useState([]);
  const getStudentData = async () => {
    try {
      const res = await axios.get("http://localhost:4080/dashboard", {
        withCredentials: true,
      });
      console.log();
      setData(res.data.dashboard);
      
    } catch (error) {
      console.log(error);
      
      if (error.response.status === 401) {
        navigate("/");
      }
    }
  };
  useEffect(() => {
    console.log(data);
    
  },[data])
  useEffect(() => {
    getStudentData();
  },[])
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
      {data&& data.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-2xl shadow text-center flex flex-col items-center justify-center space-y-2 hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          {cards[index].icon}
          <h3 className="text-2xl font-bold text-blue-600">{item.title}</h3>
          <p className="text-gray-600">{item.count}</p>
        </div>
      ))}
    </div>
  );
};

export default TeacherDashboardCard;