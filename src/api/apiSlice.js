import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const api = 'https://todo.api.devcode.gethired.id/activity-groups'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: api}),
  tagTypes: ['Todo'],
  endpoints: builder => ({})
})