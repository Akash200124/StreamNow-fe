import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    status : false,
    userData : null 
}


const authSlice = createSlice({
    name :"auth",
    initialState,
    
    reducers:{

        login:(state,action)=>{
            state.status = true;
            state.userData = action;
        },
        logout:(state,action)=>{
            state.status = false;
            state.userData = null ;
        }
    }
})

// the login and logout is actions 

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;