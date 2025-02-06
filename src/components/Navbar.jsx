import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/NoteSlice";

function Navbar() {
  const user = useSelector((state) => state.noteSlice.user);
  console.log(user);

const handleChange=()=>{
  if(!user){
    alert("Please login to create Note")
    return;
  }
  navigate("/create-note" ) 
}

  const navigate=useNavigate()
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setUser(""));
    navigate("/")
    alert("loged out successfully")
  };

  return (
    <nav className="flex items-center justify-evenly  gap-46 bg-blue-200 text-black-900 shadow-md py-6">
      <Link className="text-3xl text-blue-900  cursor-pointer hover:text-gray-500">
        NoteKeeper
      </Link>
      <div className="flex items-center gap-6">
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
        <div onClick={handleChange} className="flex  items-center hover:text-gray-500 cursor-pointer">
          <FaPlus size={27} />
          <p className="text-xl">NewNote</p>
        </div>
      </div>
      <div className="flex gap-3 min-w-[16vw] items-center">
        <p
          className={` ${user} ? "block" : "hidden"  text-lg cursor-pointer hover:text-gray-500 border-b-1 border-gray-400 `}
        >
          {user}
        </p>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-emerald-400 p-2 rounded-lg text-white hover:bg-emerald-500"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="text-xl cursor-pointer hover:text-gray-500"
          >
            Login/Signup
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
