import { ApiClient } from "../../service/ApiService";

export const requestGetBestSale = () =>
  ApiClient.get("/product/findTop10ProductBestSale", {});
export const requestGetNewProduct = () =>
  ApiClient.get("/product/findTop10productByCreateDate", {});
