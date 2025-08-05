import React from "react"; 

const Topbar = 
({toggleSidebar}) => {
    return (
        <div className="bg-white shadow px-4 py-3 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-centre gap-3">
                <button onClick={toggleSidebar} className="md:hidden text-2xl">
                </button>
                <h1 className="text-xl font-bold text-blue-700">
                    Class Companion- Student Dashboard
                </h1>
            </div>
        </div>
    );
}; 

export default Topbar;