import { configureStore } from '@reduxjs/toolkit';
import { userApi } from "./slices/UserSlice";
import userProfile from './slices/UserProfile';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user: userProfile,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
