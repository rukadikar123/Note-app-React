import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="h-screen w-full">
      <Navbar />
      <div className="flex gap-1 w-full p-1">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
