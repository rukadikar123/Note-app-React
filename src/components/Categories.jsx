import React, { useMemo, useState } from "react";
import { RiUnpinFill } from "react-icons/ri";
import { TbPinned } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToPinned, deleteNote } from "../redux/NoteSlice";

function Categories() {
  const [selectedCat, setSelectedCat] = useState(null);

  const user = useSelector((state) => state.noteSlice.user);
  const notes = useSelector((state) => state.noteSlice.notes);
  const categories = useSelector((state) => state.noteSlice.categories);

  const handleSetClick = (cat) => {
    setSelectedCat(cat);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (note) => {
    dispatch(deleteNote(note));
  };

  const handleClick = (note) => {
    dispatch(addToPinned(note));
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => note.category === selectedCat);
  }, [selectedCat, notes]);

  return (
    <>
      <div>
        {user ? (
          <div>
            <div className="flex  border p-2 shadow-md bg-gray-100 ml-4 mt-10 gap-6">
              {categories.map((cat) => (
                <p
                  onClick={() => handleSetClick(cat)}
                  className={`border ${
                    selectedCat === cat
                      ? "bg-blue-500 text-white font-semibold"
                      : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  } p-2 cursor-pointer  rounded-lg`}
                  key={cat}
                >
                  {cat}
                </p>
              ))}
            </div>
            <div>
              <div className="grid h-full grid-cols-3 bg-emerald-50 p-10 w-full gap-8 overflow-y-auto scrollbar-hide ">
                {filteredNotes?.map((note) => (
                  <Link
                    to={`/notes/${note?.id}`}
                    className={`flex flex-col gap-6 rounded-lg ${note.color} shadow-md p-4 w-full h-[250px] cursor-pointer transform transition-transform duration-200  hover:scale-105 `}
                    key={note?.id}
                  >
                    <h1 className="text-2xl font-semibold border-b-1 p-1 border-gray-500 line-clamp-1">
                      {note?.title}
                    </h1>
                    <p className="line-clamp-2 flex-grow text-gray-700 tracking-wider">
                      {note?.description}
                    </p>
                    <div className="flex items-center gap-6">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`/notes/${note?.id}`);
                        }}
                        className="py-2 px-6 bg-blue-400 text-white rounded-md hover:bg-blue-300 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDelete(note);
                        }}
                        className="py-2 px-6 bg-red-400 text-white rounded-md hover:bg-red-300 cursor-pointer"
                      >
                        Delete
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleClick(note);
                        }}
                        className={` p-2 ${
                          note.isPinned
                            ? "bg-yellow-400 hover:bg-yellow-600"
                            : "bg-gray-400 hover:bg-gray-300"
                        }  transition-all duration-300 ease-in-out rounded-full text-white hover:bg-gray-500 cursor-pointer`}
                      >
                        {note.isPinned ? (
                          <RiUnpinFill size={30} />
                        ) : (
                          <TbPinned size={30} />
                        )}
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-72 ml-72 text-xl">
            Login or sign up to get your Note{" "}
          </p>
        )}
      </div>
    </>
  );
}

export default Categories;
