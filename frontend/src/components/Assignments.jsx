import React from "react"; 
import { ClipboardList } from "lucide-react";

const Assignments = () => {
    const assignments = [
        { title: "OS Assignment 1", deadline: "2025-08-10" },
        { title: "DBMS Project Report", deadline: "2025-08-14" },
    ]; 

    return (
        <div className="bg-white p-4 shadow rounded-2xl mb-4">
            {/* Title with Icon */}
            <div className="flex items-center space-x-2 mb-4">
                <ClipboardList className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold">Assignments</h2>
            </div>

            {/* List of Assignments */}
            <ul className="space-y-3">
                {assignments.map((item, index) => (
                    <li 
                        key={index} 
                        className="border-b pb-2 hover:bg-gray-50 rounded-md transition-all cursor-pointer px-2"
                    >
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">Deadline: {item.deadline}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}; 

export default Assignments;