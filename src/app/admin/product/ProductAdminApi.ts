import { ApiClient } from "../../service/ApiService";
// interface product detail
export interface UpdateDto {
  id: number;
  isDelete: boolean;
  tagName: string;
  status: boolean;
}

export interface CreateDto {
  colorIdList: number[];
  sizeIdList: number[];
  priceExport: number;
  priceImport: number;
  productId: number;
  quantity: number;
}
export interface UpdateListDetailProductDto {
  id: number;
  image: string;
  isActive: boolean;
  priceExport: number;
  priceImport: number;
  quantity: number;
}

export interface DeleteInterface {
  detail_product_id: number;
  product_id: number;
}

// function product detail
export const requestGetDetailProductAll = (payload?: any) =>
  ApiClient.get("/admin/detailProduct/findAll", payload);

export const requestPutUpdateDetailProduct = (payload: UpdateDto) =>
  ApiClient.put("/admin/detailProduct/update", payload);

export const requestDeleteDetailProduct = (payload: DeleteInterface) =>
  ApiClient.delete("/admin/detailProduct/delete", { params: payload });

export const requestPostCreateDetailProduct = (payload: CreateDto) =>
  ApiClient.post(
    "/admin/detailProduct/createArrayOptionValueDetailProduct",
    payload
  );
export const requestPutUpdateOptioProductDetail = (payload: CreateDto) =>
  ApiClient.put(
    "/admin/detailProduct/updateArrayOptionValueDetailProduct",
    payload
  );
export const requestPutUpdateDetailProductList = (payload: {
  newDetailProductDTOList: UpdateListDetailProductDto[];
}) =>
  ApiClient.put(
    "/admin/detailProduct/updateListDetailProductAfterCreate",
    payload
  );

// interface product

export interface CreateProductDto {
  categoryId: number;
  description: string;
  image: string;
  materialProductIdList: number[];
  productName: string;
  tagProductIdList: number[];
}
export interface GetProductDto {
  page: number;
  size: number;
  name?: string;
}

export interface UpdateProductDto {
  categoryId: number;
  description: string;
  id: number;
  image: string;
  isActive: boolean;
  materialProductIds: number[];
  productName: string;
  tagProductIds: number[];
  voteAverage: number;
  isDelete: boolean;
}

// function product detail
export const requestGetProductAll = (payload: GetProductDto) =>
  ApiClient.get("/admin/product/findAllByPageble", { params: payload });
export const requestGetOptionById = (payload: { id: number }) =>
  ApiClient.get("/admin/product/findOptionProductById", { params: payload });

export const requestPutUpdateProduct = (payload: UpdateProductDto) =>
  ApiClient.put("/admin/product/update", payload);
export const requestPutUpdateProductStatus = (payload: {
  id: number;
  is_active: number;
}) => ApiClient.put("/admin/product/updateIsActive",  payload );

export const requestDeleteProduct = (payload?: { listProductId: number[] }) =>
  ApiClient.delete("/admin/product/deleteByListId", { data: payload });

export const requestPostCreateProduct = (payload: CreateProductDto) =>
  ApiClient.post("/admin/product/createArrayOptionValueProduct", payload);
