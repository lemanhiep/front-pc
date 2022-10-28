import { ApiClient } from "../../service/ApiService";

// interface favorite
export interface UpdateDto {
  id: number;
  isDelete: boolean;
  favoriteName: string;
  status: boolean;
}

export interface CreateDto {
  account_id: number;
  product_id: number;
}

// function favorite
export const requestGetFavoritesByAccount = (payload: { account_id: number }) =>
  ApiClient.get("/favorite/findProductFavoriteByAccountId", {
    params: payload,
  });

export const requestPutUpdateFavorite = (payload: UpdateDto) =>
  ApiClient.put("/favorite/update", payload);

export const requestDeleteFavorite = (payload: any) =>
  ApiClient.delete("/favorite/delete", { params: payload });

export const requestPostCreateFavorite = (payload: CreateDto) =>
  ApiClient.post(`/favorite/create?account_id=${payload.account_id}&product_id=${payload.product_id}`, { });
