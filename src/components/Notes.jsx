import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToPinned, deleteNote, updatedNotesFunc } from "../redux/NoteSlice";
import NoteList from "./NoteList";

function Notes({ moveNote, isSideBarOpen }) {
  const user = useSelector((state) => state.noteSlice?.user);
  const notes = useSelector((state) => state.noteSlice?.notes);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (note) => {
    dispatch(deleteNote(note));
  };

  const handleClick = (note) => {
    dispatch(addToPinned(note));
  };

  return (
    <div
      className={`h-[87vh] w-[100%] bg-emerald-50  md:w-[78%] ${
        isSideBarOpen ? "hidden" : "block"
      } `}
    >
      {user ? (
        <div className="grid  h-full grid-cols-1 md:grid-cols-3  md:p-10 p-6 w-full gap-4 md:gap-8 overflow-y-auto scrollbar-hide ">
          {notes?.map((note, index) => (
            <NoteList
              key={note?.id || `note-${index}`}
              note={note}
              index={index}
              moveNote={moveNote}
              navigate={navigate}
              handleDelete={handleDelete}
              handleClick={handleClick}
            />
          ))}
        </div>
      ) : (
        <p className="md:mt-72 mt-40 ml-6 md:ml-72 text-md md:text-xl">
          Login or sign up to get/create your Note{" "}
        </p>
      )}
    </div>
  );
}

export default Notes;
