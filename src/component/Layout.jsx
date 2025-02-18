import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar"; 

function Layout() {
  return (
    
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
