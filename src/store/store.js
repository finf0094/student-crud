import { configureStore } from '@reduxjs/toolkit'
import { studentApi } from './students/students.api'
import studentsSlice from './students/students.slice'

export const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
    studentsSlice: studentsSlice
  },


  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware),
})