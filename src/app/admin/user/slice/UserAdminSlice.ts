import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DataState,
  ResultApi,
  UserAdmin,
} from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";
import { requestGetUserAll } from "../UserApi";

const initialState: DataState<UserAdmin[]> = {
  data: [],
  isError: false,
  isLoading: false,
};

export const incrementAsyncUserAdmin = createAsyncThunk(
  "user/admin",
  async () => {
    const res: ResultApi<UserAdmin[]> = await requestGetUserAll();
    return res;
  }
);

export const userAdminSlice = createSlice({
  name: "user/admin",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      let oldArray = state.data;
      let item: UserAdmin = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createUser: (state, action) => {
      let item: UserAdmin = action.payload?.item;
      state.data = [item].concat(state.data);
    },
    deleteUser: (state, action) => {
      let array = state.data;
      let deleteArray = action.payload?.array;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsyncUserAdmin.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncUserAdmin.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(incrementAsyncUserAdmin.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { createUser, updateUser, deleteUser, changeLoading } =
  userAdminSlice.actions;
export default userAdminSlice.reducer;
