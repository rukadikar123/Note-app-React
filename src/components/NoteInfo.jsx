import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateNote } from "../redux/NoteSlice";
import toast from "react-hot-toast";
import { FaSave } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

function NoteInfo({isSideBarOpen}) {
  const { id } = useParams();
  const [isEditable, setIseditable] = useState(false);

   const categories = useSelector((state) => state.noteSlice.categories);
  const notes = useSelector((state) => state.noteSlice?.notes);
  const colors=useSelector(state => state.noteSlice.colors)

  const findNote = useMemo(() => {
    return notes?.find((note) => note?.id === parseInt(id)) || {};
  }, [notes, id]);

  console.log(findNote);

  const [editeNote, setEditedNote] = useState({
    id: id,
    title: "",
    description: "",
    category: "",
    isPinned:false,
    color:""
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

  const handleSetColor=(col)=>{
    if(isEditable){
      setEditedNote({...editeNote,color:col})
    toast.success("color set to your note")
    }
    
  }

  return (
    <>
      <div className={`flex-col ${isSideBarOpen ? "hidden" : "flex"} gap-4 px-6 md:px-10 py-10 w-full md:w-[78%] h-full `}>
        <div className="flex md:gap-10 gap-6 items-center">
          <label className="md:text-xl text-md font-semibold" htmlFor="">Title</label>
          <input
            className="border-1 rounded-md text-md md:text-xl md:w-[72%] w-full p-1 md:p-2"
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
            } md:block hidden px-4 py-3 text-lg rounded-lg text-white hover:bg-emerald-500 cursor-pointer`}
          >
            Edit
          </button>
          <span  onClick={() => setIseditable(true)} className="md:hidden block" ><FaEdit size={26}/></span>
          <button
            className={`bg-emerald-400 px-4 py-3 ${
              isEditable ? "md:block hidden" : "hidden"
            } text-lg  rounded-lg text-white hover:bg-emerald-500 cursor-pointer`}
            onClick={handleUpdate}
          >
            update
          </button>
          <span onClick={handleUpdate} className={` ${
              isEditable ? "block" : "hidden"
            }  md:hidden block`}><FaSave size={26}/></span>
        </div>
        <h1 className="md:text-xl text-md font-semibold">Description:</h1>
        <div className="flex gap-3 md:gap-10 ">
          <textarea
            className="border-1  rounded-md p-2 md:p-4 overflow-y-auto scrollbar-hide"
            name="description"
            placeholder="Type Your Content here"
            required
            disabled={!isEditable}
            rows={5}
            data-md-rows={15}
            cols={90}
            value={editeNote.description}
            onChange={handleChange}
          ></textarea>
           <div className=" flex flex-col items-center pt-4 gap-2">
              <p className="md:text-md text-xs">Choose a color to Your Note</p>
              {
                colors.map((col)=>(
                    <p onClick={()=>handleSetColor(col)} className={`p-2 md:p-4 w-fit border rounded-full ${col}`} key={col}></p>
                ))
              }
            </div>
        </div>
        <div className="flex flex-row  flex-wrap">
            {categories.map((cat)=>(
             <label className="p-1  border-t-1 border-b-1 " htmlFor="" key={cat}>
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
