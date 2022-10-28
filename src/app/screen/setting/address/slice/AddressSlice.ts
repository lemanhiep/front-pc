import { ResultApi } from "./../../../../contant/IntefaceContaint";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataState } from "../../../../contant/IntefaceContaint";
import { createNotification } from "../../../../utils/MessageUtil";
import { requestGetAddressAll } from "../AddressApi";

export interface Address {
  id: number;
  name: string;
}
export interface DataAddress {
  wardId?: number;
  wardName?: string;
  districtId?: number;
  districtName?: string;
  provinceId?: number;
  provinceName?: string;
  addressDetail?: string;
  isDefault?: boolean;
  isActive?: boolean;
  phoneNumber?: string;
  fullName?: string;
  id?: any;
  ward?: Address;
  province?: Address;
  district?: Address;
  name?: string;
}

interface DataStateAddress extends DataState<DataAddress[]> {
  dataSelected: DataAddress | null;
}

const initialState: DataStateAddress = {
  data: [],
  isError: false,
  isLoading: false,
  dataSelected: null,
};

export const getAddressInfo = createAsyncThunk(
  "address",
  async (account_id: number) => {
    const res: ResultApi<any> = await requestGetAddressAll({
      account_id: account_id,
    });
    return res;
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateAddress: (state, action) => {
      let oldArray = state.data;
      let item: DataAddress = action.payload?.item;
      state.data = oldArray?.map((e) => {
        if (e.id === item.id) return item;
        else return e;
      });
    },
    createAddress: (state, action) => {
      let item: DataAddress = action.payload?.item;
      state.data = [item].concat(state.data);
    },
    deleteAddress: (state, action) => {
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
    setSelectedAddress: (state, action: { payload: { item: DataAddress } }) => {
      state.dataSelected = action.payload.item;
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
      .addCase(getAddressInfo.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getAddressInfo.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getAddressInfo.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const {
  createAddress,
  deleteAddress,
  updateAddress,
  setSelectedAddress,
  changeError,
  changeLoading,
} = addressSlice.actions;

export default addressSlice.reducer;
