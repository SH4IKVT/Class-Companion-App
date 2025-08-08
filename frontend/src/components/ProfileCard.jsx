import React from "react";
import { User } from "lucide-react";

const ProfileCard = () => {
    return (
        <div className="bg-white p-4 shadow rounded-2xl mb-4 w-full">
            <div className="flex items-center mb-4">
                <div className="bg-purple-500 p-2 rounded-full mr-3">
                    <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Student Profile</h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                <p><span className="font-medium">Name:</span> Riddhi Arora</p>
                <p><span className="font-medium">Semester:</span> 5th</p>
                <p><span className="font-medium">Email:</span> ariddhi835@gmail.com</p>
            </div>
        </div>
    );
};

export default ProfileCard;