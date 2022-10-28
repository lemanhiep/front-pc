import { getIdAccount } from "../../../service/StorageService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DataState,
  ProductAdmin,
  ResultApi,
} from "../../../contant/IntefaceContaint";
import { requestGetFavoritesByAccount } from "../FavoriteApi";

const initialState: DataState<ProductAdmin[]> = {
  isError: false,
  isLoading: false,
  data: [],
};

export const getFavoritesInfo = createAsyncThunk("fav", async () => {
  const idAccount = getIdAccount();
  const res: ResultApi<ProductAdmin[]> = await requestGetFavoritesByAccount({
    account_id: Number(idAccount),
  });
  return res;
});

export const favoritesSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavoritesInfo.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getFavoritesInfo.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getFavoritesInfo.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const {} = favoritesSlice.actions;
export default favoritesSlice.reducer;
