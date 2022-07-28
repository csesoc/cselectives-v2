import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HTTPError } from "ky";
import { IGetCoursesResponse } from "src/interfaces/ResponseInterface";
import { getCourses } from "src/logic/functions/getCourses.function";
import { RootState } from "../../store";

export const getCoursesDispatch = createAsyncThunk<
  IGetCoursesResponse,
  undefined,
  { state: RootState }
>("course/getCoursesDispatch", async (_, { rejectWithValue }) => {
  try {
    const res = (await getCourses()) as IGetCoursesResponse;
    return res;
  } catch (err) {
    if (err instanceof HTTPError) {
      return rejectWithValue({
        name: err.name,
        message: err.message,
        code: err.response.status,
        stack: err.stack,
      });
    }
    throw err;
  }
});

export enum LoadingStatusTypes {
  IDLE = "IDLE",
  GET_COURSES_LOADING = "GET_COURSES_LOADING",
  GET_COURSES_FAILED = "GET_COURSES_FAILED",
  GET_COURSES_COMPLETED = "GET_COURSES_COMPLETED",
}

export interface CourseState {
  courses?: IGetCoursesResponse;
  loadingStatus: LoadingStatusTypes;
  error: any;
}

export const initialState: CourseState = {
  loadingStatus: LoadingStatusTypes.IDLE,
  error: null,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    updateCourses: (state, action: PayloadAction<IGetCoursesResponse>) => ({
      ...state,
      courses: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getCoursesDispatch.fulfilled, (state, action) => ({
      ...state,
      loadingStatus: LoadingStatusTypes.GET_COURSES_COMPLETED,
      courses: action.payload,
    }));
    builder.addCase(getCoursesDispatch.pending, (state) => {
      state.loadingStatus = LoadingStatusTypes.GET_COURSES_LOADING;
    });
    builder.addCase(getCoursesDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.loadingStatus = LoadingStatusTypes.GET_COURSES_FAILED;
    });
  },
});

export const { updateCourses } = courseSlice.actions;

export const selectCourse = (state: RootState) => state.course;
export const selectCourses = (state: RootState) =>
  state.course.courses?.courses;
export const selectCourseLoadingStatus = (state: RootState) =>
  state.course.loadingStatus;
export const selectCourseLoadingError = (state: RootState) =>
  state.course.error;

export default courseSlice.reducer;
