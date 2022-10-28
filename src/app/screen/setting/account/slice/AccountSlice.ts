import { ResultApi } from "./../../../../contant/IntefaceContaint";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserAdmin } from "../../../../contant/IntefaceContaint";
import { requestGetAccountById } from "../AccountApi";

interface DataState<T> {
  data?: T;
  isLoading?: boolean;
  isError?: boolean;
}

const initialState: DataState<UserAdmin> = {
  isError: false,
  isLoading: false,
};

export const getUserInfo = createAsyncThunk("account", async (id: number) => {
  const res: ResultApi<UserAdmin> = await requestGetAccountById({ id: id });
  return res;
});

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { setUser } = accountSlice.actions;
export default accountSlice.reducer;
