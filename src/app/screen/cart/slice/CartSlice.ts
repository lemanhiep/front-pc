import { ResultApi } from "./../../../contant/IntefaceContaint";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemCart, LIST_CART } from "../../../contant/Contant";
import {
  AddressOrderInterface,
  DataState,
  VoucherAdmin,
} from "../../../contant/IntefaceContaint";
import { createNotification } from "../../../utils/MessageUtil";
import { requestGetCartByAccountId } from "../CartApi";
import { getIdAccount } from "../../../service/StorageService";
interface DataStateCart extends DataState<ItemCart[]> {
  addressSelected?: AddressOrderInterface | null;
  voucherSelected?: VoucherAdmin | null;
}

const initialState: DataStateCart = {
  data: LIST_CART,
  isError: false,
  isLoading: false,
};

export const incrementAsyncCart = createAsyncThunk("getCart", async () => {
  const accountId = getIdAccount();
  const res: ResultApi<ItemCart[]> = await requestGetCartByAccountId({
    account_id: Number(accountId),
  });
  return res;
});

export const cartSlice = createSlice({
  name: "getCart",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      let array = state.data;
      const { id, new_quantity } = action.payload;
      state.data = array?.map((e) => {
        if (e.id === id) {
          return {
            ...e,
            quantity: new_quantity,
            totalPrice: new_quantity * e.detailProduct.priceExport,
          };
        }
        return e;
      });
    },
    deleteMoreCart: (state, action) => {
      let array = state.data;
      let deleteArray: ItemCart[] = action.payload?.array;
      deleteArray.forEach((e: any) => {
        array = array.filter((v) => e !== `${v.id}`);
      });
      state.data = array;
      createNotification({
        type: "success",
        message: "Xoá thành công",
      });
    },
    deleteItemCart: (state, action) => {
      state.data = state.data?.filter((e) => e.id !== action.payload?.id);
      createNotification({
        type: "success",
        message: `Bạn đã xoá sản phẩm khỏi giỏ hàng thành công`,
      });
    },
    addProductToCart: (state, action) => {
      let carts = state.data;
      let item: ItemCart = action.payload?.item;
      let checkExistItem = carts?.find(
        (e) => e.detailProduct.id === item.detailProduct.id
      );
      if (checkExistItem) {
        carts = carts?.map((e) => {
          if (e.detailProduct.id === item?.detailProduct.id) {
            return {
              ...e,
              quantity: item.quantity,
              totalPrice: item.quantity * e.detailProduct.priceExport,
            };
          }
          return e;
        });
      } else {
        carts = carts?.concat([item]);
      }
      state.data = carts;
      createNotification({
        type: "success",
        message: "Bạn đã thêm vào giỏ hàng thành công",
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
      .addCase(incrementAsyncCart.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(incrementAsyncCart.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(incrementAsyncCart.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const {
  updateQuantity,
  addProductToCart,
  deleteItemCart,
  deleteMoreCart,
  changeLoading,
} = cartSlice.actions;
export default cartSlice.reducer;
