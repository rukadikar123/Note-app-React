import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiUnpinFill } from "react-icons/ri";
import { TbPinned } from "react-icons/tb";
import { useDrag, useDrop } from "react-dnd";

const itemType = "NOTE";

function NoteList({
  note,
  index,
  moveNote,
  navigate,
  handleDelete,
  handleClick,
}) {
  const [{ isDragging }, drag] = useDrag({
    type: itemType,
    item: { index },
    collect: (moniter) => ({
      isDragging: moniter.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: itemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveNote(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <>
      <Link ref={(node)=> drag(drop(node))}
      key={note?.id}
        to={`/notes/${note?.id}`}
        className={`flex flex-col gap-3 md:gap-6 rounded-lg ${note?.color} shadow-md p-2 md:p-4 w-full h-[160px] md:h-[250px] cursor-pointer transform transition-transform duration-200  hover:scale-105 ${isDragging ? "opacity-50" : "opacity-100"} `}
      >
        <h1 className="md:text-2xl text-lg font-semibold border-b-1 p-1 border-gray-500 line-clamp-1">
          {note?.title}
        </h1>
        <p className="line-clamp-2 flex-grow text-gray-700 tracking-wider">
          {note?.description}
        </p>
        <div className="flex items-center gap-6">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate(`/notes/${note?.id}`);
            }}
            className="md:py-2 py-1 md:px-6 px-3 bg-blue-400 text-white rounded-md hover:bg-blue-300 cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete(note);
            }}
            className="md:py-2 py-1 md:px-6 px-3 bg-red-400 text-white rounded-md hover:bg-red-300 cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClick(note);
            }}
            className={` md:p-2 p-1 ${
              note?.isPinned
                ? "bg-yellow-400 hover:bg-yellow-600"
                : "bg-gray-400 hover:bg-gray-300"
            }  transition-all duration-300 ease-in-out rounded-full text-white hover:bg-gray-500 cursor-pointer`}
          >
            {note?.isPinned ? <RiUnpinFill size={30} /> : <TbPinned size={30} />}
          </button>
        </div>
      </Link>
    </>
  );
}

export default NoteList;
