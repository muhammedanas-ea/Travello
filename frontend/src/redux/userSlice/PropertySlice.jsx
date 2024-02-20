import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    ownerInfo:{}
}

const propertySlice = createSlice({
    name:'property',
    initialState,
    reducers:{
        setPropertyOwnerDetails:(state,action) =>{
            state.ownerInfo= action.payload.ownerInfo
        },
        setPropertyOwnerlogoutDetails:(state) =>{
            state.ownerInfo= {}
        }
    }
})

export const {setPropertyOwnerDetails, setPropertyOwnerlogoutDetails}= propertySlice.actions;
export default propertySlice.reducer;