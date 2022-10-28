import { ApiClient } from "../../service/ApiService";
// interface
export interface UpdateDto {
  order_id: number;
  status: number;
}

export interface GetOrderAdminDto {
  size: number;
  page: number;
  status?: number | null 
}

export interface DetailOrderAdminPayBack {
  detailOrderCode: string,
  quantity: number
}

export interface PayloadOrderCallBack {
  detailOrderAdminPayBacks?: DetailOrderAdminPayBack[],
  orderCode?: string,
  reason?: string,
  status?: number,
}

export interface PayloadUpdateOrderPayback {
  cartItemIds?: number[],
  orderId?: number
}

// function
export const requestGetOrderAdminAll = (payload?: GetOrderAdminDto) =>
  ApiClient.get("/admin/order/findAllByPageble", { params: payload });

export const requestPutUpdateOrder = (payload: UpdateDto) =>
  ApiClient.put(
    `/admin/order/updateByIdAndStatus?order_id=${payload.order_id}&status=${payload.status}`,
    {}
  );
export const requestGetOrderStatistic = (payload?: any) =>
  ApiClient.get("/admin/order/orderSatistic", payload);
export const requestPutUpdateOrderPayback = (payload: PayloadUpdateOrderPayback) =>
  ApiClient.put("/admin/order/updateOrderPayback", payload);

export const requestPostOrderCallBack = (payload: PayloadOrderCallBack) => ApiClient.post("admin/order/updateReturnOrder",payload)
