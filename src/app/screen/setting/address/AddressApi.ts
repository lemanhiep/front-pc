import { Axios, AxiosResponse } from "axios";
import { DataState, ResultApi } from "../../../contant/IntefaceContaint";
import { ApiClient } from "../../../service/ApiService";
import { Address } from "./slice/AddressSlice";

// interface product detail
export interface UpdateDto {
  accountId: number;
  addressDetail: string;
  districtId: number;
  id: number;
  provinceId: number;
  wardId: number;
  fullName: string;
  isDefault: boolean;
  phoneNumber: string;
}

export interface CreateDto {
  accountId?: number;
  addressDetail: string;
  districtId: number;
  provinceId: number;
  wardId: number;
  fullName: string;
  isDefault: boolean;
  phoneNumber: string;
}

export interface DeleteInterface {
  address_id: number;
}

// function product detail
export const requestGetAddressAll = (payload?: { account_id: number }) =>
  ApiClient.get("/address/findByAccountId", { params: payload });

export const requestPutUpdateAddress = (payload: UpdateDto) =>
  ApiClient.put("/address/update", payload);

export const requestDeleteAddress = (payload: DeleteInterface) =>
  ApiClient.delete("/address/delete", { params: payload });

export const requestPostCreateAddress = (payload: CreateDto) =>
  ApiClient.post("/address/create", payload);

export const requestGetProvinceAll = () =>
  ApiClient.get("/province/findAll", {});
export const requestGetDistrictByProvinceId = (payload: {
  province_id: number;
}) => ApiClient.get("/district/findByProviceId", { params: payload });
export const requestGetWardByDistrictId = (payload: { district_id: number }) =>
  ApiClient.get("/ward/findByDistrictId", { params: payload });
