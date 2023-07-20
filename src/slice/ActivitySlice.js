import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const activityAdapter = createEntityAdapter({})
const initialState = activityAdapter.getInitialState()
const email = 'bilpo@mail.com'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getActivities: builder.query({
      query: () => `?email=${email}`,
      providesTags: (result, error, arg) => [
        { type: 'Activity', id: "LIST" },
        // ...result.ids.map(id => ({ type: 'Activity', id }))
      ]
    }),
    createActivity: builder.mutation({
      query: initialActivity => ({
        url: '/',
        method: 'POST',
        body: {
          title: 'New Acitvity',
          email: email
        }
      }),
      invalidatesTags: [
        { type: 'Activity', id: "LIST" }
      ]
    }),
    deleteActivity: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'DELETE',
        body: {id}
      }),
      invalidatesTags: [
        { type: 'Activity', id: "LIST" }
      ]
    })
  })
})

export const { useGetActivitiesQuery, useCreateActivityMutation, useDeleteActivityMutation } = extendedApiSlice

export const selectActivityResult = extendedApiSlice.endpoints.getActivities.select()

// memoized selector
const selectActivitiesData = createSelector(
  selectActivityResult,
  activityResult => activityResult.data
)

export const {
  selectAll,
  selectById,
  selectIds
} = activityAdapter.getSelectors(state => selectActivitiesData(state) ?? initialState)