import { ApiClient } from "../../service/ApiService";
// interface
export interface GetOrderDto {
  account_id: number;
  status: number;
}

export interface CreateOrderDto {
  accountId?: number;
  addressDetail?: string;
  addressId?: number;
  cartItemIdList?: number[];
  fullName?: string;
  phoneNumber?: string;
  salePrice?: number;
}
// function
export const requestGetOrderAll = (payload: GetOrderDto) =>
  ApiClient.get("user/order/findByAccountId", { params: payload });

export const requestPutUpdateorder = (payload: any) =>
  ApiClient.put("/order/update", payload);

export const requestDeleteorder = (payload: { order_id: number }) =>
  ApiClient.delete("/order/delete", { params: payload });

export const requestPostCreateOrder = (payload: CreateOrderDto) =>
  ApiClient.post("/user/order/create", payload);

export const requestGetOrderDetail = (payload: { order_id: number }) =>
  ApiClient.get("/order/detail", payload);
