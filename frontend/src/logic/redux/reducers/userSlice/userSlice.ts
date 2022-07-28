import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HTTPError } from "ky";
import { IPostUserResponse } from "src/interfaces/ResponseInterface";
import { postLogin } from "../../../functions/postLogin.function";
import { RootState } from "../../store";

export const postLoginDispatch = createAsyncThunk<
  IPostUserResponse,
  string,
  { state: RootState }
>("user/postLoginDispatch", async (zid, { rejectWithValue }) => {
  try {
    const res = (await postLogin(zid)) as IPostUserResponse;
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
  POST_LOGIN_LOADING = "POST_LOGIN_LOADING",
  POST_LOGIN_FAILED = "POST_LOGIN_FAILED",
  POST_LOGIN_COMPLETED = "POST_LOGIN_COMPLETED",
}

export interface UserState {
  user?: IPostUserResponse;
  loadingStatus: LoadingStatusTypes;
  error: any;
}

export const initialState: UserState = {
  loadingStatus: LoadingStatusTypes.IDLE,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<IPostUserResponse>) => ({
      ...state,
      user: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(postLoginDispatch.fulfilled, (state, action) => ({
      ...state,
      loadingStatus: LoadingStatusTypes.POST_LOGIN_COMPLETED,
      user: action.payload,
    }));
    builder.addCase(postLoginDispatch.pending, (state) => {
      state.loadingStatus = LoadingStatusTypes.POST_LOGIN_LOADING;
    });
    builder.addCase(postLoginDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.loadingStatus = LoadingStatusTypes.POST_LOGIN_FAILED;
    });
  },
});

export const { updateUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoadingStatus = (state: RootState) =>
  state.user.loadingStatus;
export const selectUserLoadingError = (state: RootState) => state.user.error;

export default userSlice.reducer;
