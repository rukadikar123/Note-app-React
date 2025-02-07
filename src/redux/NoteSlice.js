import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  user: "",
  notes: [],
};

export const NoteSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.notes = JSON.parse(localStorage.getItem(action.payload)) || [];
    },
    addNote: (state, action) => {
      const newData = action.payload;
      const isPresent = state.notes.find(
        (data) =>
          data.title.trim().toLowerCase() ===
            newData.title.trim().toLowerCase() &&
          data.description.trim().toLowerCase() === newData.description.trim().toLowerCase() 
      );
      if (isPresent) {
        alert("Note is already present");
        return;
      }
      state.notes.push(newData);
      localStorage.setItem(state.user, JSON.stringify(state.notes));
      toast.success("Note added successfully")
    },
    updateNote:(state, action)=>{
      const updatedNote=action.payload
      state.notes=state.notes.map((note)=>{
       return note.id === updatedNote.id ? updatedNote : note
    })
      localStorage.setItem(state.user, JSON.stringify(state.notes))
      toast.success("Note added successfully")
    },
    deleteNote:(state, action)=>{
      const updatedNotes = state.notes.filter((item) => item.id !== action.payload.id);
      state.notes = updatedNotes;
      if (state.user) {
        localStorage.setItem(state.user, JSON.stringify(updatedNotes));
      }
      toast.success("Note deleted successfully")
    },
    addToPinned:(state, action)=>{
      const note = action.payload;

      // Create a new updated notes array
      state.notes = state.notes.map((item) =>
        item.id === note.id ? { ...item, isPinned:!item.isPinned } : item
      );
    
      const updatedNote=state.notes.find(item => item.id === note.id)

      if(updatedNote.isPinned){
        toast.success("Note pinned successfully.");
      }else{
        toast.success("Note UnPinned successfully.");
      }

      // Save updated notes in localStorage if user exists
      if (state.user) {
        localStorage.setItem(state.user, JSON.stringify(state.notes));
      } else {
        console.error("User key is missing, cannot save notes to localStorage.");
      }
      
     
    }
  },
});

export const { setUser, addNote, updateNote, deleteNote, addToPinned } = NoteSlice.actions;

export default NoteSlice.reducer;
