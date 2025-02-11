import React, { useMemo, useState } from "react";
import { RiUnpinFill } from "react-icons/ri";
import { TbPinned } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToPinned, deleteNote } from "../redux/NoteSlice";
import NoteList from "./NoteList";

function Categories({ moveNote , isSideBarOpen}) {
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

  const findOriginalIndex = (id) => notes.findIndex((note) => note.id === id);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => note.category === selectedCat);
  }, [selectedCat, notes]);

  return (
    <>
      <div >
        {user ? (
          <div className={` h-[82vh] md:h-[80vh] md:w-[100%] bg-emerald-50 ${isSideBarOpen ? "hidden" : "block p-4"}`}>
            <div className="flex  flex-wrap w-full  border rounded-md md:rounded-2xl p-1 shadow-md bg-gray-100 md:px-4 py-2 md:py-4 gap-2 md:gap-6">
              {categories.map((cat) => (
                <p
                  onClick={() => handleSetClick(cat)}
                  className={`border text-[11px] md:text-[15px] ${
                    selectedCat === cat
                      ? "bg-blue-500 text-white font-semibold"
                      : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  } p-1 md:p-2 cursor-pointer  rounded-lg`}
                  key={cat}
                >
                  {cat}
                </p>
              ))}
            </div>
            <div >
              {user && (
                <div className="grid h-[57vh] md:h-[68vh] grid-cols-1 md:grid-cols-3 mt-4 md:mt-0 p-6 md:p-10 gap-4 md:gap-8 overflow-y-auto scrollbar-hide ">
                  {filteredNotes?.map((note) => {
                    const originalIndex = findOriginalIndex(note.id);
                    return (
                      <NoteList
                        key={note?.id}
                        index={originalIndex}
                        note={note}
                        moveNote={moveNote}
                        navigate={navigate}
                        handleDelete={handleDelete}
                        handleClick={handleClick}
                      />
                    );
                  })}
                </div>
              ) }
            </div>
          </div>
        ) : (
          <p className="md:mt-72 mt-40 ml-6 md:ml-72 text-md md:text-xl">
            Login or sign up to get your Note{" "}
          </p>
        )}
      </div>
    </>
  );
}

export default Categories;
