import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const passengerApi = createApi({
  reducerPath: "passengerApi",
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
  tagTypes: ["Passenger"],
  endpoints: (builder) => ({
    // ✅ Add Passenger
    addPassenger: builder.mutation({
      query: (data) => ({
        url: "/add-passenger",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Passenger"],
    }),

    //  Get All Passengers
    getPassengers: builder.query({
      query: () => "/all-passenger",
      providesTags: ["Passenger"],
    }),

    //  Get Passenger by ID
    getPassengerById: builder.query({
      query: (id) => `/passenger/${id}`,
      providesTags: ["Passenger"],
    }),

    //  Update Passenger
    updatePassenger: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/edit-passenger/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Passenger"],
    }),

    // Delete Passenger
    deletePassenger: builder.mutation({
      query: (id) => ({
        url: `/delete-passenger/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Passenger"],
    }),
  }),
});

export const {
  useAddPassengerMutation,
  useGetPassengersQuery,
  useGetPassengerByIdQuery,
  useUpdatePassengerMutation,
  useDeletePassengerMutation,
} = passengerApi;
