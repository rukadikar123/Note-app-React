import React, { useMemo, useState } from "react";
import { RiUnpinFill } from "react-icons/ri";
import { TbPinned } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToPinned, deleteNote } from "../redux/NoteSlice";
import NoteList from "./NoteList";

function Categories({ moveNote }) {
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
      <div>
        {user ? (
          <div className="h-[72vh] w-[78vw] ">
            <div className="flex mt-4 border rounded-2xl p-2 shadow-md bg-gray-100 pl-4 py-4 gap-6">
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
            <div >
              {user ? (
                <div className="grid h-[75vh]  grid-cols-3 bg-emerald-50 p-10 w-full gap-8 overflow-y-auto scrollbar-hide ">
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
              ) : (
                <p className="mt-72 ml-72 text-xl">
                  Login or sign up to get/create your Note{" "}
                </p>
              )}
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
