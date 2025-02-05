import { configureStore } from "@reduxjs/toolkit";
import  NoteSliceReducer  from "./NoteSlice";

const store=configureStore({
    reducer:{
        noteSlice:NoteSliceReducer
    }
})

export default store