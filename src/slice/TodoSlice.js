import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const activityAdapter = createEntityAdapter({})
const initialState = activityAdapter.getInitialState()

export const extendedApiSliceTodo = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createTodo: builder.mutation({
      query: initialTodo => ({
        url: '/todo-items',
        method: 'POST',
        body: {
          ...initialTodo
        }
      }),
      invalidatesTags: [ 'Todo' ]
    }),
    updateTodo: builder.mutation({
      query: payload => ({
        url: `/todo-items/${payload.id}`,
        method: 'PATCH',
        body: {
          title: payload.title,
          activity_group_id: payload.activityId,
          priority: payload.priority
        }
      }),
      invalidatesTags: (result, error, arg) => [
        // console.log(arg),
        { type: 'Todo', id: arg.id }
      ]
    }),
    markAsDone: builder.mutation({
      query: payload => ({
        url: `/todo-items/${payload.id}`,
        method: 'PATCH',
        body: {
          is_active: payload.status,
        }
      }),
      invalidatesTags: (result, error, arg) => [
        // console.log(arg),
        { type: 'Todo', id: arg.id }
      ]
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todo-items/${id}`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        // console.log(arg),
        { type: 'Todo', id: arg.id }
      ]
    })
  })
})

export const { useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation, useMarkAsDoneMutation } = extendedApiSliceTodo