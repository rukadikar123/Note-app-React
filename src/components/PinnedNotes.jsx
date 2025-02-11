import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToPinned, deleteNote } from "../redux/NoteSlice";
import NoteList from "./NoteList";

function PinnedNotes({moveNote, isSideBarOpen}) {
  const user = useSelector((state) => state.noteSlice.user);
  console.log(user);
  const notes = useSelector((state) => state.noteSlice.notes);
  console.log(notes);

  const pinnedNotes = notes.filter((note) => note.isPinned);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (note) => {
    dispatch(deleteNote(note));
  };

  const findOriginalIndex = (id) => notes.findIndex((note) => note.id === id);

  const handleClick = (note) => {
    dispatch(addToPinned(note));
  };

  return (
    <>
      <div className={`h-[83vh] md:h-[80vh] w-[78%] bg-emerald-50 ${isSideBarOpen ? "hidden" : "block"}`}>
        {user ? (
          <div className="grid h-full grid-cols-1 md:grid-cols-3  p-6 md:p-10 w-full gap-4 md:gap-8 overflow-y-auto scrollbar-hide ">
            {pinnedNotes?.map((note) => {
              const originalIndex = findOriginalIndex(note.id); 
              return <NoteList 
                key={note?.id}
                index={originalIndex}
                note={note}
                moveNote={moveNote}
                navigate={navigate}
                handleDelete={handleDelete}
                handleClick={handleClick}
              />
})}
          </div>
        ) : (
          <p className="md:mt-72 mt-40 ml-6 md:ml-72 text-md md:text-xl">
            Login or sign up to get/create your Note{" "}
          </p>
        )}
      </div>
    </>
  );
}

export default PinnedNotes;
