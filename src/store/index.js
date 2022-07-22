import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    marks:0
}

const answerSlice = createSlice({
    name:'answer',
    initialState,
    reducers:{
        correct(state){
            state.marks ++
        }
    }
})

export const answerAction = answerSlice.actions

export default answerSlice