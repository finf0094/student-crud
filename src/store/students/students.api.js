import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080/'

export const studentApi = createApi({
    reducerPath: "api/students",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    // eslint-disable-next-line no-unused-vars
    endpoints: build => ({
        getStudents: build.query({
            // eslint-disable-next-line no-unused-vars
            query: (limit = 6) => `student/show?limit=${6}`
        }),
        getStudentById: build.query({
            query: (id) => `student/${id}`
        }),
        addStudent: build.query({
            query: (name, university, gpa) => ({
                url: '/students',
                method: "POST",
                body: {
                    name: name,
                    university: university,
                    gpa: gpa
                }
            }),
        })
    })
})

export const { useGetStudentsQuery, useGetStudentByIdQuery } = studentApi;