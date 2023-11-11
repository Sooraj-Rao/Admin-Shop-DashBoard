import {createSlice} from '@reduxjs/toolkit'

const YesSure=createSlice({
name:"YesSure",
initialState:false,
reducers:{
    Yes(state,action){
        return !state
    }
}
})
export const {Yes}= YesSure.actions
export default YesSure.reducer

