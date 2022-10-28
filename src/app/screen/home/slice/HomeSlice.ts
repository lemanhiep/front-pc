import { requestGetBestSale } from "./../HomeApi";
import {
  DataState,
  ProductAdmin,
  ResultApi,
} from "./../../../contant/IntefaceContaint";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestGetNewProduct } from "../HomeApi";

interface DataHome {
  listNewProduct: ProductAdmin[];
  listBestSale: ProductAdmin[];
}

const initialState: DataState<DataHome> = {
  data: {
    listBestSale: [],
    listNewProduct: [],
  },
  isError: false,
  isLoading: false,
};

export const incrementAsyncHome = createAsyncThunk(
  "home/getImage",
  async () => {
    const resultNewProduct: ResultApi<ProductAdmin[]> =
      await requestGetNewProduct();
    const resultBestSaleProduct: ResultApi<ProductAdmin[]> =
      await requestGetBestSale();
    const res: DataHome = {
      listBestSale: resultBestSaleProduct.data,
      listNewProduct: resultNewProduct.data,
    };
    return { res };
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsyncHome.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncHome.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload.res;
      })
      .addCase(incrementAsyncHome.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default homeSlice.reducer;
