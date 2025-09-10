import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./slices/UserSlice";
import userProfile from "./slices/UserProfile";
import { passengerApi } from "./slices/PassengerSlice";
import { CompaignApi } from "./slices/CompaignSlice";
import { feedbackApi } from "./slices/FeedbackSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [passengerApi.reducerPath]: passengerApi.reducer,
    [CompaignApi.reducerPath]: CompaignApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    user: userProfile,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      passengerApi.middleware,
      CompaignApi.middleware,
      feedbackApi.middleware
    ),
});
