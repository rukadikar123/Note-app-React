import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout({setIsSideBarOpen, isSideBarOpen}) {
  return (
    <div className="h-screen w-full">
      <Navbar />
      <div className="flex  w-full p-1">
        <Sidebar 
        isSideBarOpen={isSideBarOpen}
                  setIsSideBarOpen={setIsSideBarOpen}/>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
