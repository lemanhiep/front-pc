import { TYPE_ORDER } from "./../components/ItemOrderComponent";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemCart } from "../../../contant/Contant";
import { DataState, VoucherAdmin } from "../../../contant/IntefaceContaint";
import { getIdAccount } from "../../../service/StorageService";
import { DataAddress } from "../../setting/address/slice/AddressSlice";
import { GetOrderDto, requestGetOrderAll } from "../OrderApi";
import { ResultApi } from "./../../../contant/IntefaceContaint";

export interface History {
  description: string;
  id: number;
  isActive: boolean;
  status: number;
  totalPrice: any;
  updateTime: string;
}

export interface OrderDetailPayload extends ItemCart {
  detailOrderCode : string
}

export interface OrderDto {
  id: number;
  createDate: string;
  status: number;
  fullName: string;
  phoneNumber: string;
  amountPrice: number;
  salePrice: number;
  totalPrice: number;
  addressDetail: string;
  cartItems: ItemCart[];
  orderCode: string;
  address: {
    id: number;
    addressDetail: string;
    isDeleted: boolean;
    createDate: string;
    province: DataAddress;
    district: DataAddress;
    ward: DataAddress;
    isActive: boolean;
  };
  historyOrders: History[];
  detailOrders?: OrderDetailPayload[]
}
export interface DataOrder {
  id: number;
  create_date: string;
  totalPrice: number;
  address?: DataAddress | null;
  products?: ItemCart[] | null;
  voucher?: VoucherAdmin | null;
  status: number;
  totalProduct: number;
  totalDiscount: number;
  code?: string;
  history?: History[];
}

interface DataOrderList {
  pedding: DataState<OrderDto[]>;
  confirm: DataState<OrderDto[]>;
  delivery: DataState<OrderDto[]>;
  adrived: DataState<OrderDto[]>;
  done: DataState<OrderDto[]>;
  cancel: DataState<OrderDto[]>;
  roll_back: DataState<OrderDto[]>;
}

const LIST_ORDER_PENDING: OrderDto[] = [];

const initialState: DataOrderList = {
  pedding: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  adrived: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  cancel: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  confirm: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  delivery: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  done: {
    data: LIST_ORDER_PENDING,
    isError: false,
    isLoading: false,
  },
  roll_back: {
    data: [],
    isError: false,
    isLoading: false,
  },
};

export const getOrderInfo = createAsyncThunk(
  "order",
  async (payload: { status: number }) => {
    const idAccount = getIdAccount();
    const params: GetOrderDto = {
      account_id: Number(idAccount),
      status: payload.status,
    };
    const res: ResultApi<OrderDto[]> = await requestGetOrderAll(params);
    return res;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrder: (state, action) => {
      const {item,status,key}:{item: OrderDto,status: number, key: keyof DataOrderList } = action.payload

      let array = state[key].data;
      let deleteArray: OrderDto[] = [item];
      deleteArray.forEach((e: any) => {
        array = array.filter((v) => e !== `${v.id}`);
      });
      const data: DataState<OrderDto[]> = {
        isLoading: false,
        isError: false,
        data: array,
      };
    },
    createOrder: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderInfo.pending, (state, action) => {
        let status = action.meta.arg.status;
        switch (status) {
          case TYPE_ORDER.PENDING:
            state.pedding.isLoading = true;
            state.pedding.isError = false;
            break;
          case TYPE_ORDER.CONFIRM:
            state.confirm.isLoading = true;
            state.confirm.isError = false;
            break;
          case TYPE_ORDER.DELIVETY:
            state.delivery.isLoading = true;
            state.delivery.isError = false;
            break;
          case TYPE_ORDER.RECEIVED:
            state.adrived.isLoading = true;
            state.adrived.isError = false;
            break;
          case TYPE_ORDER.DONE:
            state.done.isLoading = true;
            state.done.isError = false;
            break;
          case TYPE_ORDER.CANCEL:
            state.cancel.isLoading = true;
            state.cancel.isError = false;
            break;
          case TYPE_ORDER.DELAY:
            state.roll_back.isLoading = true;
            state.roll_back.isError = false;
            break;
        }
      })
      .addCase(getOrderInfo.fulfilled, (state, action) => {
        const data: DataState<OrderDto[]> = {
          isLoading: false,
          isError: false,
          data: action.payload.data,
        };

        let status = action.meta.arg.status;
        switch (status) {
          case TYPE_ORDER.PENDING:
            state.pedding = data;
            break;
          case TYPE_ORDER.CONFIRM:
            state.confirm = data;
            break;
          case TYPE_ORDER.DELIVETY:
            state.delivery = data;
            break;
          case TYPE_ORDER.RECEIVED:
            state.adrived = data;
            break;
          case TYPE_ORDER.DONE:
            state.done = data;
            break;
          case TYPE_ORDER.CANCEL:
            state.cancel = data;
            break;
          case TYPE_ORDER.DELAY:
            state.roll_back = data;
            break;
        }
      })
      .addCase(getOrderInfo.rejected, (state, action) => {
        let status = action.meta.arg.status;
        switch (status) {
          case TYPE_ORDER.PENDING:
            state.pedding.isLoading = false;
            state.pedding.isError = true;
            break;
          case TYPE_ORDER.CONFIRM:
            state.confirm.isLoading = false;
            state.confirm.isError = true;
            break;
          case TYPE_ORDER.DELIVETY:
            state.delivery.isLoading = false;
            state.delivery.isError = false;
            break;
          case TYPE_ORDER.RECEIVED:
            state.adrived.isLoading = false;
            state.adrived.isError = true;
            break;
          case TYPE_ORDER.DONE:
            state.done.isLoading = false;
            state.done.isError = true;
            break;
          case TYPE_ORDER.CANCEL:
            state.cancel.isLoading = false;
            state.cancel.isError = true;
            break;
          case TYPE_ORDER.DELAY:
            state.roll_back.isLoading = false;
            state.roll_back.isError = true;
            break;
        }
      });
  },
});
export const { createOrder, updateOrder } = orderSlice.actions;

export default orderSlice.reducer;
