import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DataState,
  Material,
  ResultApi,
} from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";
import { requestGetMaterialAll } from "../MaterialApi";

const initialState: DataState<Material[]> = {
  data: [],
  isError: false,
  isLoading: false,
};

export const incrementAsyncMaterialAdmin = createAsyncThunk(
  "material/admin",
  async (params?: { name: string }) => {
    const res: ResultApi<Material[]> = await requestGetMaterialAll(params);
    return res;
  }
);

export const materialAdminSlice = createSlice({
  name: "material/admin",
  initialState,
  reducers: {
    updateMaterial: (state, action) => {
      let oldArray = state.data;
      let item: Material = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createMaterial: (state, action) => {
      let item: Material = action.payload?.item;
      state.data = [item].concat(state.data);
    },
    deleteMaterial: (state, action) => {
      let array = state.data;
      let deleteArray: Material[] = action.payload?.array;
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
      .addCase(incrementAsyncMaterialAdmin.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncMaterialAdmin.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(incrementAsyncMaterialAdmin.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const {
  createMaterial,
  updateMaterial,
  deleteMaterial,
  changeError,
  changeLoading,
} = materialAdminSlice.actions;
export default materialAdminSlice.reducer;
