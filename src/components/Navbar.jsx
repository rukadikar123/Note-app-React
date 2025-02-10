import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSearchTerm, setUser } from "../redux/NoteSlice";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [searchNote, setSearchNote] = useState("");

  const user = useSelector((state) => state.noteSlice.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchNote) {
      if (!user) {
        alert("You must log in to view your notes.");
        setSearchNote("");
        return;
      }
      dispatch(setSearchTerm(searchNote));
      setSearchNote("");
      navigate("/searched-notes");
    }
  };

  const handleChange = () => {
    if (!user) {
      alert("Please login to create Note");
      return;
    }
    navigate("/create-note");
  };

  const handleLogout = () => {
    dispatch(setUser(""));
    navigate("/");
    alert("loged out successfully");
  };

  return (
    <nav
      className={`w-full flex items-center px-1 md:justify-evenly ${
        user ? "gap-3" : "justify-between px-2"
      } md:gap-46 bg-blue-200 text-black-900 shadow-md py-4 md:py-6`}
    >
      <Link className="md:text-3xl text-sm text-blue-900  cursor-pointer hover:text-gray-500">
        NoteKeeper
      </Link>
      <div className="flex items-center gap-1 md:gap-6">
        <div className="flex  items-center">
          <input
            className="md:w-[35vw] w-[45vw] text-[9px] md:text-[14px]  outline-none p-1 rounded-lg rounded-r-none border-1 border-gray-400"
            type="text"
            placeholder="Search Note here"
            value={searchNote}
            onChange={(e) => setSearchNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <FaSearch
            onClick={handleSearch}
            // size={33}
            className="rounded-lg rounded-l-none border-1 text-xl md:text-3xl p-1 md:p-2 border-gray-400 cursor-pointer"
          />
        </div>
        <div
          onClick={handleChange}
          className="md:flex hidden items-center hover:text-gray-500 cursor-pointer"
        >
          <FaPlus size={27} />
          <p className="text-xl">NewNote</p>
        </div>
        { user && <FaPlus onClick={handleChange} className="md:hidden block" size={15} />}
      </div>
      <div className="flex md:gap-3  md:min-w-[16vw] min-w-[10vw]  items-center">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={` ${
            isOpen ? "md:static absolute top-1" : ""
          } ${user} ? "block" : "hidden"  text-sm md:text-lg cursor-pointer hover:text-gray-500  border-gray-400 `}
        >
          <p>{user}</p>
          <p
            onClick={handleLogout}
            className={`${isOpen ? "block " : "hidden"} md:hidden block `}
          >
            Logout
          </p>
        </div>
        {user ? (
          <div onClick={handleLogout}>
            <button className="bg-emerald-400 md:block hidden  p-2 rounded-lg text-white hover:bg-emerald-500">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <div className="md:text-xl md:block hidden text-sm  cursor-pointer hover:text-gray-500">
              Login/Signup
            </div>
            <div className="md:text-xl text-sm md:hidden block cursor-pointer hover:text-gray-500">
              Login
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
