import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Navbar() {
  
  return (
    <nav className="flex items-center justify-center gap-40 bg-blue-200 text-black-900 shadow-md py-6">
      <Link className="text-3xl text-blue-900  cursor-pointer hover:text-gray-500">NoteKeeper</Link>
      <div className="flex gap-8">
        <div className="flex items-center">
          <input    
            className="w-[35vw] outline-none p-1 rounded-lg rounded-r-none border-1 border-gray-400"
            type="text"
            placeholder="Search Note here"
          />
          <FaSearch
            size={33}
            className="rounded-lg rounded-l-none border-1 p-2 border-gray-400 cursor-pointer"
          />
        </div>
        <div className="flex  items-center hover:text-gray-500 cursor-pointer">
          <FaPlus size={27}/>
          <p className="text-xl">NewNote</p>
        </div>
      </div>
      <Link to="/login" className="text-xl cursor-pointer hover:text-gray-500">Login/Signup</Link>
    </nav>
  );
}

export default Navbar;
