import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestGetMaterialAll } from "../../../admin/material/MaterialApi";
import {
  requestGetColorAll,
  requestGetSizeAll,
} from "../../../admin/option/OptionApi";
import { requestGetTagAll } from "../../../admin/tag/TagApi";
import { DataState, ResultApi } from "../../../contant/IntefaceContaint";
import { requestGetCategorylAllByParentId } from "../ProductCustomerApi";
import {
  CategoryAdmin,
  Material,
  OptionColor,
  OptionSize,
  Tag,
} from "./../../../contant/IntefaceContaint";

interface DataFilter {
  categories?: CategoryAdmin[];
  sizes?: OptionSize[];
  colors?: OptionColor[];
  materials?: Material[];
  tags?: Tag[];
}

const initialState: DataState<DataFilter> = {
  data: {
    categories: [],
    colors: [],
    materials: [],
    sizes: [],
    tags: [],
  },
  isError: false,
  isLoading: false,
};

export const incrementAsyncFilter = createAsyncThunk(
  "Filter/getImage",
  async () => {
    const resCategory: ResultApi<CategoryAdmin[]> =
      await requestGetCategorylAllByParentId();
    const resSize: ResultApi<OptionSize[]> = await requestGetSizeAll();
    const resColor: ResultApi<OptionColor[]> = await requestGetColorAll();
    const resTag: ResultApi<Tag[]> = await requestGetTagAll();
    const resMaterial: ResultApi<Material[]> = await requestGetMaterialAll();
    const res: DataFilter = {
      categories: resCategory.data,
      colors: resColor.data,
      materials: resMaterial.data,
      sizes: resSize.data,
      tags: resTag.data,
    };
    return res;
  }
);

export const FilterSlice = createSlice({
  name: "Filter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsyncFilter.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncFilter.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(incrementAsyncFilter.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default FilterSlice.reducer;
