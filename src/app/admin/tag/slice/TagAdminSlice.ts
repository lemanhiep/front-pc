import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataState, ResultApi, Tag } from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";
import { requestGetTagAll } from "../TagApi";

const initialState: DataState<Tag[]> = {
  data: [],
  isError: false,
  isLoading: false,
};

export const incrementAsyncTagAdmin = createAsyncThunk(
  "tag/admin",
  async (params?: { name: string }) => {
    // call api here
    const result: ResultApi<Tag[]> = await requestGetTagAll({ params });
    return result;
  }
);

export const tagAdminSlice = createSlice({
  name: "tag/admin",
  initialState,
  reducers: {
    updateTag: (state, action) => {
      let oldArray = state.data;
      let item: Tag = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
      createNotification({
        type: "success",
        message: "Cập nhật thành công",
      });
    },
    createTag: (state, action) => {
      let item: Tag = action.payload?.item;
      state.data = [item].concat(state.data);
      createNotification({
        type: "success",
        message: "Thêm mới thành công",
      });
    },
    deleteTag: (state, action) => {
      let array = state.data;
      let deleteArray: Tag[] = action.payload?.array;
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
      .addCase(incrementAsyncTagAdmin.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncTagAdmin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload?.data;
      })
      .addCase(incrementAsyncTagAdmin.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { createTag, updateTag, deleteTag, changeError, changeLoading } =
  tagAdminSlice.actions;
export default tagAdminSlice.reducer;
