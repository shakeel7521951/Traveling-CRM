import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CompaignApi = createApi({
  reducerPath: "CompaignApi",
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
  tagTypes: ["compaign"],
  endpoints: (builder) => ({
    // ✅ Add Compaign
    addCompaign: builder.mutation({
      query: (data) => ({
        url: "/createCompaign",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["compaign"],
    }),

    // ✅ Get All Compaigns
    getAllCompaigns: builder.query({
      query: () => "/getCompaigns",
      providesTags: ["compaign"],
    }),

    //get Station compaigns
    stationCompaigns: builder.query({
      query: () => "/stationCompaigns",
      providesTags: ['compaign']
    }),
    //  Get Single Compaign
    getCompaignById: builder.query({
      query: (id) => `/getCompaign/${id}`,
      providesTags: ["compaign"],
    }),

    // Update Compaign
    updateCompaign: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/updateCompaign/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["compaign"],
    }),

    // ✅ Delete Compaign
    deleteCompaign: builder.mutation({
      query: (id) => ({
        url: `/deleteCompaign/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["compaign"],
    }),
  }),
});

export const {
  useStationCompaignsQuery,

  useAddCompaignMutation,
  useGetAllCompaignsQuery,
  useGetCompaignByIdQuery,
  useUpdateCompaignMutation,
  useDeleteCompaignMutation,
} = CompaignApi;
