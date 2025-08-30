import { createSlice,nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";


const initialState={
   called:[
    {
        isupdate:false,
    isdelete:false,
    }
   ]

};


export const updateSlice= createSlice({
    name:"updatestore",
    initialState,
    reducers:{
        update:(state,action)=>{
            const tempobj={
                isupdate:false,
                isdelete:false
            }

            state.called.push(tempobj)
        },
        remove:(state,action)=>{
           const tempobj={
                isupdate:false,
                isdelete:false
            }

            state.called.push(tempobj)
        },

    }
});


export const {update,remove} = updateSlice.actions
export default updateSlice.reducer