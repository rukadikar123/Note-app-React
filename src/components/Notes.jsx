import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteNote } from "../redux/NoteSlice";

function Notes() {
  const user = useSelector((state) => state.noteSlice.user);
  console.log(user);
  const notes = useSelector((state) => state.noteSlice.notes);
  console.log(notes);

  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleDelete=(note)=>{
    
    dispatch(deleteNote(note))    
  }


  return (
    <div className="h-[87vh] w-[80%] ">
      {user ? (
        <div className="grid h-full grid-cols-3 bg-emerald-50 p-10 w-full gap-8 overflow-y-auto scrollbar-hide ">
          {notes?.map((note) => (
            <Link
              to={`/notes/${note?.id}`}
              className="flex flex-col gap-6 shadow-md p-4 w-full h-[250px] cursor-pointer transform transition-transform duration-200  hover:scale-105 "
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
                    e.stopPropagation();
                    navigate(`/notes/${note?.id}`)
                  } }
                  className="py-2 px-6 bg-blue-400 text-white rounded-md hover:bg-blue-300 cursor-pointer"
                >
                  Edit
                </button>
                <button onClick={(e)=>{
                  e.preventDefault()
                  e.stopPropagation()
                  handleDelete(note)
                }} className="py-2 px-6 bg-red-400 text-white rounded-md hover:bg-red-300 cursor-pointer">
                  Delete
                </button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-72 ml-72 text-xl">
          Login or sign up to create your Note{" "}
        </p>
      )}
    </div>
  );
}

export default Notes;
