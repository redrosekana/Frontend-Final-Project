import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import recommendReducer from "./recommendPayloadSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    recommendPayload: recommendReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
