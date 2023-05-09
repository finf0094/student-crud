import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:8080/'

export const subjectsApi = createApi({
    reducerPath: "api/students",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: build => ({
        addSubject: build.mutation({
            query: (data) => {
                const {id, ...body} = data;
                return {
                    url: `/student/${id}/addSubject`,
                    method: 'Post',
                    body,
                }
            },
            
        })
    })
})

export const { useAddSubjectMutation } = subjectsApi;