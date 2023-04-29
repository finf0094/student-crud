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
        searchStudentsByName: build.query({
            query: (searchText) => `student?filter=${searchText}`,
        }),
        addStudent: build.mutation({
            query: body => ({
                url: '/student/',
                method: "POST",
                body
            }),
        }),
        updateStudent: build.mutation({
            query: (data) => {
                const {id, ...body} = data;
                return {
                    url: '/student/' + id,
                    method: 'PUT',
                    body,
                }
            },
        }),
        deleteStudent: build.mutation({
            query: id => ({
                url: '/student/' + id,
                method: "DELETE"
            }),
        }),
    })
})

export const { useGetStudentsQuery, useGetStudentByIdQuery, useSearchStudentsByNameQuery, useAddStudentMutation, useUpdateStudentMutation, useDeleteStudentMutation } = studentApi;