import { createSlice } from "@reduxjs/toolkit";


const getUserDetails = () => {
    return JSON.parse(localStorage.getItem('cbUser')) || null ;
}

const initialState = {
    currentUser : getUserDetails() ,
}

const authSlice = createSlice({
    name : "auth" , 
    initialState , 
    reducers : {
        userLogin : (state , payload) => {
            localStorage.setItem('cbUser' , JSON.stringify(useActionState.payload)) ; 
            state.currentUser = useActionState.payload ;
        }
    }
})

export const {userLogin} = authSlice.actions ;
export default authSlice.reducer ;