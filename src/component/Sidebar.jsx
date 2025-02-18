import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react"; 

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`relative ${isCollapsed ? "w-16" : "w-64"} bg-purple-500 text-white min-h-screen p-4 transition-all duration-300`}>
      
      
      <button 
        className="absolute top-5 -right-4 bg-white text-purple-400 p-1 rounded-full shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <ul className={`mt-4 space-y-2 ${isCollapsed ? "text-center" : ""}`}>
        <li>
          <Link to="/dashboard" className="block p-2 hover:bg-white hover:text-black hover:rounded-2xl">
            {!isCollapsed && "Dashboard"}
          </Link>
        </li>
        {/* <li>
          <Link to="/dashboard/profile" className="block p-2 hover:bg-white hover:text-black hover:rounded-2xl">
            {!isCollapsed && "Profile"}
          </Link>
        </li> */}
      </ul>
    </div>
  );
}

export default Sidebar;
