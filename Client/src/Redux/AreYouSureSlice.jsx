import {createSlice} from '@reduxjs/toolkit'

const AreYouSure=createSlice({
name:"AreYouSure",
initialState:false,
reducers:{
    show(state,action){
        return !state
    }
}
})
export const {show}= AreYouSure.actions
export default AreYouSure.reducer

