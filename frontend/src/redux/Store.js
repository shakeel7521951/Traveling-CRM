import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./slices/UserSlice";
import userProfile from "./slices/UserProfile";
import { passengerApi } from "./slices/PassengerSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [passengerApi.reducerPath]: passengerApi.reducer,
    user: userProfile,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, passengerApi.middleware),
});
