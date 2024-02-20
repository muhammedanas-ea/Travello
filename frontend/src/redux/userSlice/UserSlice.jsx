import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userInfo : {},
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserDetails:(state,action) =>{
            state.userInfo= action.payload.userInfo;
        },
        setUserlogoutDetails:(state) =>{
            state.userInfo= {}
        }
    }
})

export const {setUserDetails, logoutDetails}= userSlice.actions;
export default userSlice.reducer;