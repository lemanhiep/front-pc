import { OptionSize } from "./../../contant/IntefaceContaint";
import { ApiClient } from "../../service/ApiService";
// interface color
export interface UpdateColorDto {
  id: number;
  isDelete: boolean;
  colorName: string;
  isActive: boolean;
}

export interface CreateColorDto {
  colorName: string;
}

// function color
export const requestGetColorAll = (payload?: any) =>
  ApiClient.get("/admin/color/findAll", payload);

export const requestPutUpdateColor = (payload: UpdateColorDto) =>
  ApiClient.put("/admin/color/update", payload);

export const requestDeleteColor = (payload: { listColorId: number[] }) =>
  ApiClient.delete("/admin/color/deleteByListId", { data: payload });

export const requestPostCreateColor = (payload: CreateColorDto) =>
  ApiClient.post("/admin/color/create", payload);

// interface size
export interface UpdateSizeDto {
  id: number;
  isDelete: boolean;
  sizeName: string;
  status: boolean;
}

export interface CreateSizeDto {
  sizeName: string;
}

// function size
export const requestGetSizeAll = (payload?: any) =>
  ApiClient.get("/admin/size/findAll", payload);

export const requestPutUpdateSize = (payload: OptionSize) =>
  ApiClient.put("/admin/size/update", payload);

export const requestDeleteSize = (payload: { listSizeId: number[] }) =>
  ApiClient.delete("/admin/size/deleteByListId", { data: payload });

export const requestPostCreateSize = (payload: CreateSizeDto) =>
  ApiClient.post("/admin/size/create", payload);
