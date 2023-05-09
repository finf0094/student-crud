import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080/'

export const studentApi = createApi({
    reducerPath: "api/students",
    tagTypes: ["students", "student", "subjects"],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: build => ({
        getStudents: build.query({
            query: (limit = 6) => `student/show?limit=${6}`,
            
            providesTags: ["students", "student"]
        }),
        getStudentById: build.query({
            query: (id) => `student/${id}`,

            providesTags: ["subjects", "student"],
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

            invalidatesTags: ["students"]
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

            invalidatesTags: ["student", "students"]
        }),
        deleteStudent: build.mutation({
            query: id => ({
                url: '/student/' + id,
                method: "DELETE"
            }),

            invalidatesTags: ["student", "students"]
        }),
        addSubject: build.mutation({
            query: (data) => {
                const {id, ...body} = data;
                return {
                    url: `/student/${id}/addSubject`,
                    method: 'Post',
                    body,
                }
            },
            
            invalidatesTags: ["subjects"]
        })
    })
})

export const { 
    useGetStudentsQuery,
    useGetStudentByIdQuery,
    useSearchStudentsByNameQuery, 
    useAddStudentMutation, 
    useUpdateStudentMutation, 
    useDeleteStudentMutation,
    useAddSubjectMutation
} = studentApi;
