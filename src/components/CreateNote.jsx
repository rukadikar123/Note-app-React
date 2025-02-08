import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../redux/NoteSlice";
import toast from "react-hot-toast";

function CreateNote() {

 const categories = useSelector((state) => state.noteSlice.categories);
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    category: "",
    isPinned: false,
    color:"",
  });


  const colors=useSelector(state => state.noteSlice.colors)
  const user = useSelector((state) => state.noteSlice.user);

  const dispatch = useDispatch();

  const handleAddNote = () => {
    if (
      !noteData.title.trim() ||
      !noteData.description.trim() || 
      !noteData.category
    ) {
      alert("Note can' be emplty");
      return;
    }
    dispatch(addNote({ ...noteData, id: Date.now() }));
    setNoteData({ title: "", description: "", category: "", isPinned: false });
    toast.success("Note added successfully");
  };

const handleSetColor=(col)=>{
  setNoteData({...noteData,color:col})
  toast.success("color set to your note")
}

  return (
    <>
      {user ? (
        <div className="flex flex-col gap-4 px-6 py-16 w-full h-full ">
          <div className="flex gap-10 items-center">
            <input
              className="border-1 rounded-md text-xl w-[70%] p-2"
              type="text"
              placeholder="Title"
              required
              value={noteData.title}
              onChange={(e) =>
                setNoteData({ ...noteData, title: e.target.value })
              }
            />
            <button
              onClick={handleAddNote}
              className="bg-emerald-400 px-4 py-3 text-lg rounded-lg text-white hover:bg-emerald-500 cursor-pointer"
            >
              Create
            </button>
          </div>
          <div className="flex gap-10 ">
            <textarea
              className="border-1  rounded-md p-4 overflow-y-auto scrollbar-hide"
              name="description"
              placeholder="Type Your Content here"
              required
              rows={15}
              cols={90}
              value={noteData.description}
              onChange={(e) =>
                setNoteData({ ...noteData, description: e.target.value })
              }
            ></textarea>
            <div className=" flex flex-col items-center pt-4 gap-2">
              <p>Choose a color to Your Note</p>
              {
                colors.map((col)=>(
                    <p onClick={()=>handleSetColor(col)} className={`p-4 w-fit border rounded-full ${col}`} key={col}></p>
                ))
              }
            </div>
          </div>
          <div>
            {categories.map((cat)=>(
             <label className="p-1 border-t-1 border-b-1 " htmlFor="" key={cat}>
               <input 
              type="radio"
              name="category"
              placeholder="Category"
              value={cat}
              checked={noteData.category===cat}
              onChange={() =>
                setNoteData({...noteData, category:cat})
              }
            /> {cat}
             </label>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-72 ml-72 text-xl">
          Login or sign up to create your Note{" "}
        </p>
      )}
    </>
  );
}

export default CreateNote;
