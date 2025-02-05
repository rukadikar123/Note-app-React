import { createSlice } from "@reduxjs/toolkit";

const initialState={
    notes:[],
    user:""
}

export const NoteSlice=createSlice({
    name:'noteSlice',
    initialState,
    reducers:{
            setUser:(state, action)=>{
                state.user=action.payload
            }
    }
})

export const {setUser, }=NoteSlice.actions

export default NoteSlice.reducer