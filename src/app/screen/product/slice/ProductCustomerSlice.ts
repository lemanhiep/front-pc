import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DataState,
  ProductAdmin,
  ResultApi,
} from "../../../contant/IntefaceContaint";
import {
  FilterProductDto,
  requestGetProductCustomer,
} from "../ProductCustomerApi";
interface ProductCustomer extends DataState<ProductAdmin[]> {
  count?: number;
}

const initialState: ProductCustomer = {
  data: [],
  isError: false,
  isLoading: false,
};

export const incrementAsyncProduct = createAsyncThunk(
  "Product/getImage",
  async (params: FilterProductDto) => {
    const res: ResultApi<{ content: ProductAdmin[]; totalElements: number }> =
      await requestGetProductCustomer(params);
    return res;
  }
);

export const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsyncProduct.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncProduct.fulfilled, (state, action) => {
        state.data = action.payload.data.content;
        state.isError = false;
        state.isLoading = false;
        state.count = action.payload.data.totalElements;
      })
      .addCase(incrementAsyncProduct.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default ProductSlice.reducer;
