//It isnt any necessary u have to create files the here ,u have can also create under features package 


import { createSlice } from "@reduxjs/toolkit"; //careful what imports are coming from sometimes this may giev error

const initialState={
    status:false,
    userData:null
}


const authSlice = createSlice({
    //here we have 
    //name of the reducer
    //initial State which can be defined here or also else where
    //actual reducer logic


    name:"auth",
    initialState, //imported from the above

    reducers:{
        login:(state,action)=>{
            state.status=true
            state.userData=action.payload.userData
        },

        logout:(state)=>{
            state.status=false
            state.userData=null
        }
    }
})

export const {login,logout} =authSlice.actions
export default authSlice.reducer