import { requestGetColorAll } from "./../OptionApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DataState,
  OptionColor,
  ResultApi,
} from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";

const initialState: DataState<OptionColor[]> = {
  data: [],
  isError: false,
  isLoading: false,
};

export const incrementAsyncOptionColor = createAsyncThunk(
  "option/Color",
  async (params?: { name?: string }) => {
    const res: ResultApi<OptionColor[]> = await requestGetColorAll({ params });
    return res;
  }
);

export const optionColorSlice = createSlice({
  name: "option/Color",
  initialState,
  reducers: {
    updateColor: (state, action) => {
      let oldArray = state.data;
      let item: OptionColor = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
      createNotification({ type: "success" });
    },
    createColor: (state, action) => {
      let item: OptionColor = action.payload?.item;
      state.data = [item].concat(state.data);
      createNotification({ type: "success" });
    },
    deleteColor: (state, action) => {
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
      .addCase(incrementAsyncOptionColor.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncOptionColor.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(incrementAsyncOptionColor.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const {
  createColor,
  deleteColor,
  updateColor,
  changeError,
  changeLoading,
} = optionColorSlice.actions;
export default optionColorSlice.reducer;
