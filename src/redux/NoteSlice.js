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
    }
  },
});

export const { setUser, addNote, updateNote } = NoteSlice.actions;

export default NoteSlice.reducer;
