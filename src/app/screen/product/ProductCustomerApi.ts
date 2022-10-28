import { ApiClient } from "../../service/ApiService";
// interface
export interface GetProductDto {
  size: number;
  page: number;
}

export interface FilterPayloadProductDto {
  listCategoryId: number[];
  listColorId: number[];
  listMaterialId: number[];
  listSizeId: number[];
  listTagId: number[];
  page: number;
  size: number;
}
export interface FilterProductDto extends FilterPayloadProductDto {
  bottomPrice: number;
  topPrice: number;
}

export interface ProductDetailByIdProduct {
  product_id: number;
}

// function
export const requestGetCategorylAll = () =>
  ApiClient.get("/category/findAll", {});
export const requestGetCategorylAllByParentId = () =>
  ApiClient.get("/category/findAllCategoryParentId", {});
export const requestGetProductCustomer = (payload: FilterProductDto) =>
  ApiClient.post("/product/findByOpionalArrayValue", payload);

export const requestGetProductCustomerById = (payload: {
  product_id: number;
  account_id?: number | null;
}) => ApiClient.get("/product/findOptionProductById", { params: payload });
export const requestGetProductDetailByIdProduct = (
  payload: ProductDetailByIdProduct
) => ApiClient.get("/productDetail/findByProductId", { params: payload });
