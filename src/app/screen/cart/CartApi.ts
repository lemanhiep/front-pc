import { ApiClient } from "../../service/ApiService";
// interface
export interface CreateCartDto {
  accountId: number;
  detailProductId: number;
  quantity: number;
  totalPrice: number;
}

export interface UpdateCartDto {
  id: number;
  quantity: number;
  totalPrice: number;
}

// function
export const requestGetCartByAccountId = (payload: { account_id: number }) =>
  ApiClient.get("/user/cart/findByAccountId", { params: payload });

export const requestPutUpdateCart = (payload: UpdateCartDto) =>
  ApiClient.put("/user/cart/update", payload);

export const requestDeleteCart = (payload: { id: number }) =>
  ApiClient.delete("/user/cart/delete", { params: payload });

export const requestPostCreateCart = (payload: CreateCartDto) =>
  ApiClient.post("/user/cart/create", payload);
