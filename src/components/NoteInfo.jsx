import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateNote } from "../redux/NoteSlice";

function NoteInfo() {
  const { id } = useParams();
  const [isEditable, setIseditable] = useState(false);

   const categories = useSelector((state) => state.noteSlice.categories);
  const notes = useSelector((state) => state.noteSlice?.notes);
  const findNote = useMemo(() => {
    return notes?.find((note) => note?.id === parseInt(id)) || {};
  }, [notes, id]);

  console.log(findNote);

  const [editeNote, setEditedNote] = useState({
    id: id,
    title: "",
    description: "",
    category: "",
    isPinned:false
  });
  useEffect(() => {
    if (findNote) {
      setEditedNote({
        id: findNote.id,
        title: findNote.title || "",
        description: findNote.description || "",
        category: findNote.category || "",
        isPinned:findNote.isPinned || ""
      });
    }
  }, [findNote]);

  const handleChange = (e) => {
    setEditedNote({ ...editeNote, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleUpdate = () => {
    if (
      !editeNote.title.trim() ||
      !editeNote.description.trim()
    ) {
      alert("Note can' be emplty");
      return;
    }

    dispatch(updateNote(editeNote));
    setIseditable(false);
  };

  return (
    <>
      <div className="flex flex-col gap-4 px-6 py-10 w-full h-full ">
        <div className="flex gap-10 items-center">
          <label className="text-xl font-semibold" htmlFor="">Title</label>
          <input
            className="border-1 rounded-md text-xl w-[70%] p-2"
            type="text"
            name="title"
            placeholder="Title"
            required
            disabled={!isEditable}
            value={editeNote.title}
            onChange={handleChange}
          />
          <button
            onClick={() => setIseditable(true)}
            className={`bg-emerald-400 
            } px-4 py-3 text-lg rounded-lg text-white hover:bg-emerald-500 cursor-pointer`}
          >
            Edit
          </button>
          <button
            className={`bg-emerald-400 px-4 py-3 ${
              isEditable ? "block" : "hidden"
            } text-lg rounded-lg text-white hover:bg-emerald-500 cursor-pointer`}
            onClick={handleUpdate}
          >
            update
          </button>
        </div>
        <h1 className="text-xl font-semibold">Description</h1>
        <div>
          <textarea
            className="border-1  rounded-md p-4 overflow-y-auto scrollbar-hide"
            name="description"
            placeholder="Type Your Content here"
            required
            disabled={!isEditable}
            rows={15}
            cols={90}
            value={editeNote.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
            {categories.map((cat)=>(
             <label className="p-1 border-t-1 border-b-1 " htmlFor="" key={cat}>
               <input 
              type="radio"
              name="category"
              placeholder="Category"
              value={cat}
              disabled={!isEditable}
              checked={editeNote.category===cat}
              onChange={() =>
                setEditedNote({...editeNote, category:cat})
              }
            /> {cat}
             </label>
            ))}
          </div>
      </div>
    </>
  );
}

export default NoteInfo;
