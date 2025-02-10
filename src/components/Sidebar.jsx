import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

function Sidebar({setIsSideBarOpen, isSideBarOpen}) {
  
 
  return (
    <div
      className={`md:w-[22%] ${
        isSideBarOpen ? "w-[90%]  shadow-md bg-gray-100" : "w-8"
      }   h-[87vh] py-2 md:py-4 md:px-1`}
    >
      <button onClick={() => setIsSideBarOpen(!isSideBarOpen)} className="block md:hidden">
        <IoMdMenu size={30} />
      </button>
      <ul className={`md:flex ${isSideBarOpen ? "flex flex-col" :"hidden"} flex-col gap-6`}>
        <Link
          to="/"
         
          className="text-xl border-b-1 p-2 border-gray-300 hover:bg-emerald-300"
        >
          Home
        </Link>
        <Link
          to="/pinned-notes"
          className="text-xl border-b-1 p-2 border-gray-300 hover:bg-emerald-300"
        >
          Pinned Notes
        </Link>
        <Link
          to="/category"
          className="text-xl border-b-1 p-2 border-gray-300 hover:bg-emerald-300"
        >
          Categories
        </Link>
        <Link
          to="/trashed-notes"
          className="text-xl border-b-1 p-2 border-gray-300 hover:bg-emerald-300"
        >
          Trash
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
