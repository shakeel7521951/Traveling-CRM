import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["feedback"],
  endpoints: (builder) => ({
    // ✅ Create Feedback
    createFeedback: builder.mutation({
      query: (data) => ({
        url: "/createFeedback",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["feedback"],
    }),

    // ✅ Get All Feedback
    getAllFeedback: builder.query({
      query: (params = {}) => ({
        url: "/getAllFeedback",
        method: "GET",
        params,
      }),
      providesTags: ["feedback"],
    }),

    // ✅ Get Feedback Stats
    getFeedbackStats: builder.query({
      query: () => ({
        url: "/stats",
        method: "GET",
      }),
      providesTags: ["feedback"],
    }),

    // ✅ Get Single Feedback
    getSingleFeedback: builder.query({
      query: (id) => ({
        url: `/getSingleFeedback?id=${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "feedback", id }],
    }),

    // ✅ Update Feedback
    updateFeedback: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateFeedback/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "feedback", id },
        "feedback",
      ],
    }),

    // ✅ Delete Feedback
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `/deleteFeedback/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["feedback"],
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useGetAllFeedbackQuery,
  useGetFeedbackStatsQuery,
  useGetSingleFeedbackQuery,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;