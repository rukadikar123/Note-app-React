
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToPinned, deleteNote, updatedNotesFunc, } from "../redux/NoteSlice";
import NoteList from "./NoteList";


function Notes({moveNote}) {
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
    <div className="h-[87vh] w-[100%]  md:w-[80%] ">
      {user ? (
        <div className="grid h-full grid-cols-3 bg-emerald-50 p-10 w-full gap-8 overflow-y-auto scrollbar-hide ">
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
        <p className="mt-72 ml-72 text-xl">
          Login or sign up to get/create your Note{" "}
        </p>
      )}
    </div>
  );
}

export default Notes;


