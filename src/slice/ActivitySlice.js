import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const activityAdapter = createEntityAdapter({})
const initialState = activityAdapter.getInitialState()
const email = 'bilpo@mail.com'

export const extendedApiSliceActivity = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getActivities: builder.query({
      query: () => `/activity-groups?email=${email}`,
      providesTags: (result, error, arg) => [
        // console.log(result),
        // console.log(result.data.map(({ id }) => id)),
        { type: 'Activity', id: "LIST" },
        // 'Activity',
        ...result.data.map(({ id }) => ({ type: 'Activity', id })),
        // ...result.ids.map(id => ({ type: 'Activity', id })),
      ]
    }),
    getActivity: builder.query({
      query: id => `/activity-groups/${id}`,
      providesTags: (result, error, arg) => [
        // console.log(arg),
        { type: 'Activity', id: arg },
        { type: 'Todo', id: arg },
        ...result.todo_items.map(({ id }) => ({ type: 'Todo', id }))
      ]
    }),
    updateActivityName: builder.mutation({
      query: initialActivity => ({
        url: `/activity-groups/${initialActivity.id}`,
        method: 'PATCH',
        body: {
          title: initialActivity.title
        }
      }),
      // invalidatesTags: ['Activity']
      invalidatesTags: (result, error, arg) => [
        // console.log(arg),
        { type: 'Activity', id: arg.id }
      ]
    }),
    createActivity: builder.mutation({
      query: initialActivity => ({
        url: '/activity-groups',
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
        url: `/activity-groups/${id}`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: [
        { type: 'Activity', id: "LIST" }
      ]
    })
  })
})

export const { useGetActivitiesQuery, useGetActivityQuery, useCreateActivityMutation, useDeleteActivityMutation, useUpdateActivityNameMutation } = extendedApiSliceActivity

export const selectActivityResult = extendedApiSliceActivity.endpoints.getActivities.select()

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