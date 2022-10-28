import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataState, ResultApi } from "../../../../contant/IntefaceContaint";
import { requestGetProvinceAll } from "../AddressApi";

export interface DataProvince {
  id: number;
  name: string;
}

const initialState: DataState<DataProvince[]> = {
  data: [],
  isError: false,
  isLoading: false,
};

export const getProvinceInfo = createAsyncThunk("Province", async () => {
  const res: ResultApi<DataProvince[]> = await requestGetProvinceAll();
  return res;
});

export const ProvinceSlice = createSlice({
  name: "Province",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProvinceInfo.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getProvinceInfo.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getProvinceInfo.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export default ProvinceSlice.reducer;
