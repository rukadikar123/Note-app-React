import { createSlice } from "@reduxjs/toolkit";

const initialState={
    notes:[]
}

const NoteSlice=createSlice({
    name:'noteSlice',
    initialState,
    reducers:{

    }
})

export default NoteSlice