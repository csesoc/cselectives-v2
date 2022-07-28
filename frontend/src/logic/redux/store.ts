import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice/userSlice";
import { courseSlice } from "./reducers/courseSlice/courseSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    course: courseSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
