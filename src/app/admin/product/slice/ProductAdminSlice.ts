import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DataState,
  ProductAdmin,
  ResultApi,
} from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";
import { GetProductDto, requestGetProductAll } from "../ProductAdminApi";
interface ProductState extends DataState<ProductAdmin[]> {
  count: number;
}

const initialState: ProductState = {
  data: [],
  isError: false,
  isLoading: false,
  count: 0,
};

export const incrementAsyncProductAdmin = createAsyncThunk(
  "product/admin",
  async (payload: GetProductDto) => {
    const res: ResultApi<{ content: ProductAdmin[]; totalElements: number }> =
      await requestGetProductAll(payload);
    return res;
  }
);

export const productAdminSlice = createSlice({
  name: "product/admin",
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      let oldArray = state.data;
      let item: ProductAdmin = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createProduct: (state, action) => {
      let item: ProductAdmin = action.payload?.item;
      state.data = [item].concat(state.data);
      state.count = state.count + 1;
    },
    deleteProduct: (state, action) => {
      let array = state.data;
      let deleteArray: ProductAdmin[] = action.payload?.array;
      deleteArray.forEach((e: any) => {
        array = array.filter((v) => e !== `${v.id}`);
      });
      state.data = array;

      createNotification({
        type: "success",
        message: "Xoá thành công",
      });
    },
    changeLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    changeError: (state, action) => {
      state.isError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsyncProductAdmin.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncProductAdmin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload.data.content;
        state.count = action.payload.data.totalElements;
      })
      .addCase(incrementAsyncProductAdmin.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const {
  createProduct,
  updateProduct,
  deleteProduct,
  changeError,
  changeLoading,
} = productAdminSlice.actions;
export default productAdminSlice.reducer;
