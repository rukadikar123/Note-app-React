import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashCan } from "react-icons/fa6";
import { TbRestore } from "react-icons/tb";
import { deletePermanently, restoreNote } from "../redux/NoteSlice";
import toast from "react-hot-toast";

function Trash({isSideBarOpen}) {
  const user = useSelector((state) => state.noteSlice.user);
  console.log(user);


  const deletedNotes=useSelector(state=> state.noteSlice.deletedNotes)
  const dispatch=useDispatch()

const handleDeletePermanent=(note)=>{
    dispatch(deletePermanently(note))
}
const handleRestore=(note)=>{
    dispatch(restoreNote(note))
    toast.success("Note restored successfully")
}
  return (
    <>
    <div className={`h-[83vh] md:h-[80vh] w-[78%] bg-emerald-50 ${isSideBarOpen ? "hidden" : "block"} `}>
      
        {user ? (
          <div className="grid h-full grid-cols-1 md:grid-cols-3  p-6 md:p-10 w-full gap-4 md:gap-8 overflow-y-auto scrollbar-hide ">
            {deletedNotes.length>0 ? deletedNotes?.map((note) => (
              <div
                to={`/notes/${note?.id}`}
                className={`flex flex-col gap-2 md:gap-6 ${note.color} shadow-md rounded-lg p-2 md:p-4 w-full h-[160px] md:h-[250px] cursor-pointer   `}
                key={note?.id}
              >
                <h1 className="md:text-2xl text-lg font-semibold border-b-1 p-1 border-gray-500 line-clamp-1">
                  {note?.title}
                </h1>
                <p className="line-clamp-2 flex-grow text-gray-700 tracking-wider">
                  {note?.description}
                </p>
                <div className="flex items-center justify-around">
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeletePermanent(note)
                    }}
                    className="py-2 px-2 bg-red-400 text-white rounded-full hover:bg-red-300 cursor-pointer"
                  >
                    <FaRegTrashCan/>
                  </button>
                  <button
                    onClick={(e)=>{
                        e.preventDefault();
                      e.stopPropagation();
                      handleRestore(note)
                    }}
                  className="py-2 px-2 bg-green-400 text-white rounded-full hover:bg-green-300 cursor-pointer">
                        <TbRestore size={20}/>
                  </button>
                  
                </div>
              </div>
            )) : <p className="md:ml-86 ml-10 w-full mt-40 md:mt-60 text-2xl font-semibold text-red-500">Trash is empty</p>}
          </div>
        ) : (
          <p className="md:mt-72 mt-40 ml-2 md:ml-72 text-md md:text-xl">
            Login or sign up to get your deleted Note{" "}
          </p>
        )}
      </div>

    </>
  );
}

export default Trash;
