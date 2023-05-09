import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentAdded: false,
}

const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {
        toggleStudentAdded: (state) => {
            state.studentAdded = !state.studentAdded
        }
    }
});

export const { toggleStudentAdded } = studentsSlice.actions;

export default studentsSlice.reducer;