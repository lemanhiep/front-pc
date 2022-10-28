import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DataState,
  OptionSize,
  ResultApi,
} from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";
import { requestGetSizeAll } from "../OptionApi";

const initialState: DataState<OptionSize[]> = {
  data: [],
  isError: false,
  isLoading: false,
};

export const incrementAsyncOptionSize = createAsyncThunk(
  "option/Size",
  async (params?: { name?: string }) => {
    const res: ResultApi<OptionSize[]> = await requestGetSizeAll({ params });
    return res;
  }
);

export const optionSizeSlice = createSlice({
  name: "option/Size",
  initialState,
  reducers: {
    updateSize: (state, action) => {
      let oldArray = state.data;
      let item: OptionSize = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
      createNotification({ type: "success" });
    },
    createSize: (state, action) => {
      let item: OptionSize = action.payload?.item;
      state.data = state.data.concat([item]);
      createNotification({ type: "success" });
    },
    deleteSize: (state, action) => {
      let array = state.data;
      let deleteArray: any[] = action.payload?.array;
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
      .addCase(incrementAsyncOptionSize.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncOptionSize.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(incrementAsyncOptionSize.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const {
  createSize,
  deleteSize,
  updateSize,
  changeError,
  changeLoading,
} = optionSizeSlice.actions;
export default optionSizeSlice.reducer;
