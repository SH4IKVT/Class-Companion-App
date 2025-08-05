import React, { useEffect } from "react";
import {
  BookOpen,
  FileText,
  Bell,
  HelpCircle,
} from "lucide-react";
import axios from "axios";

const iconData = [
  {
    title: "Assignments",
    value: 5,
    bg: "bg-blue-50",
    text: "text-blue-700",
    icon: <FileText className="w-8 h-8 text-blue-500" />, // colored icon
  },
  {
    title: "Notes",
    value: 12,
    bg: "bg-green-50",
    text: "text-green-700",
    icon: <BookOpen className="w-8 h-8 text-green-500" />,
  },
  {
    title: "Announcements",
    value: 4,
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    icon: <Bell className="w-8 h-8 text-yellow-500" />,
  },
  {
    title: "Doubts",
    value: 7,
    bg: "bg-pink-50",
    text: "text-pink-700",
    icon: <HelpCircle className="w-8 h-8 text-pink-500" />,
  },
];

const DashboardCards = () => {
  const [data, setData] = React.useState([]);
  const getStudentData = async () => {
    try {
      const res = await axios.get("http://localhost:4080/dashboard", {
        withCredentials: true,
      });
      console.log();
      setData(res.data.dashboard);
      
    } catch (error) {
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {data&& data.map((item,index) => (
        <div
          key={index}
          className={'flex items-center justify-between p-4 rounded-2xl shadow ${item.bg} hover:scale-[1.02] transition-transform duration-200 text-black'}
        >
          <div>
            <h3 className={'text-lg font-semibold ${item.text}'}>{item.title}</h3>
            <p className={'text-2xl font-bold ${item.text}'}>{item.count}</p>
          </div>
          <div>{iconData[index].icon}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;