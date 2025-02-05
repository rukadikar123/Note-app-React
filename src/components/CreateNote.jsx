import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../redux/NoteSlice";

function CreateNote() {
const [noteData, setNoteData]=useState({
    title:"",
    description:""
})


const dispatch=useDispatch()

const handleAddNote=()=>{
    dispatch(addNote(noteData))
    setNoteData({title:"",description:""})
    
}

  return (
    <div className="flex flex-col gap-4 px-6 py-16 w-full h-full ">
      <div className="flex gap-10 items-center">
        <input
          className="border-1 rounded-md text-xl w-[70%] p-2"
          type="text"
          placeholder="Title"
          required
          value={noteData.title}
          onChange={(e)=>setNoteData({...noteData ,title:e.target.value })}
        />
        <button onClick={handleAddNote} className="bg-emerald-400 p-3 text-lg rounded-lg text-white hover:bg-emerald-500 cursor-pointer">
          Create
        </button>
      </div>
      <div>
        <textarea
          className="border-1 rounded-md p-4 overflow-y-auto scrollbar-hide"
          name="description"
          required
          rows={15}
          cols={90}
          value={noteData.description}
          onChange={(e)=>setNoteData({...noteData ,description:e.target.value })}
        ></textarea>
      </div>
    </div>
  );
}

export default CreateNote;
