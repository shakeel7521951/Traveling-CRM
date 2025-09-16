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
  tagTypes: ["feedback", "complaint"],
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
        url: "/getFeedbacks",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.search && { search: params.search }),
          ...(params.station && { station: params.station }),
          ...(params.feedbackType && { feedbackType: params.feedbackType }),
          ...(params.rating && { rating: params.rating }),
          ...(params.status && { status: params.status }),
        },
      }),
      providesTags: ["feedback"],
    }),
    getStationFeedbacks: builder.query({
      query: (params = {}) => ({
        url: "/getStationFeedbacks",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.search && { search: params.search }),
          ...(params.station && { station: params.station }),
          ...(params.feedbackType && { feedbackType: params.feedbackType }),
          ...(params.rating && { rating: params.rating }),
          ...(params.status && { status: params.status }),
        },
      }),
      providesTags: ["feedback"],
    }),

    // ✅ Get Single Feedback
    getSingleFeedback: builder.query({
      query: (id) => ({
        url: `/getSingleFeedback/${id}`,
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

    // ✅ Get Complaints
    getComplaints: builder.query({
      query: (params = {}) => ({
        url: "/getComplaints",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.search && { search: params.search }),
          ...(params.station && { station: params.station }),
          ...(params.status && { status: params.status }),
          ...(params.priority && { priority: params.priority }),
        },
      }),
      providesTags: ["complaint"],
    }),

    getStationComplaints: builder.query({
      query: (params = {}) => ({
        url: "/stationComplaints",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.search && { search: params.search }),
          ...(params.station && { station: params.station }),
          ...(params.status && { status: params.status }),
          ...(params.priority && { priority: params.priority }),
        },
      }),
      providesTags: ["complaint"],
    }),

    // ✅ Get Complaint Stats
    getComplaintStats: builder.query({
      query: () => ({
        url: "/getComplaintStats",
        method: "GET",
      }),
      providesTags: ["complaint"],
    }),

    getStationComplaintStats: builder.query({
      query: () => ({
        url: "/getStationComplaintStats",
        method: "GET",
      }),
      providesTags: ["complaint"],
    }),

    // ✅ Update Complaint (uses same endpoint as feedback update)
    updateComplaintStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/updateFeedback/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "complaint", id },
        "complaint",
      ],
    }),

    // ✅ Delete Complaint (same as feedback delete)
    deleteComplaint: builder.mutation({
      query: (id) => ({
        url: `/deleteFeedback/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["complaint"],
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useGetAllFeedbackQuery,
  useGetStationFeedbacksQuery,
  useGetSingleFeedbackQuery,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
  useGetComplaintsQuery,
  useGetComplaintStatsQuery,
  useUpdateComplaintStatusMutation,
  useDeleteComplaintMutation,
  useGetStationComplaintsQuery,
  useGetStationComplaintStatsQuery
} = feedbackApi;
