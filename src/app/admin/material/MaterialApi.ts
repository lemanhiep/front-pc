import { ApiClient } from "../../service/ApiService";
// interface
export interface UpdateDto {
  id: number;
  isActive: boolean;
  materialName: string;
  isDelete: boolean;
}

export interface CreateDto {
  materialName: string;
}

// function
export const requestGetMaterialAll = (payload?: { name: string }) =>
  ApiClient.get("/admin/material/findAll", { params: payload });

export const requestPutUpdateMaterial = (payload: UpdateDto) =>
  ApiClient.put("/admin/material/update", payload);

export const requestDeleteMaterial = (payload: { listMaterialId: number[] }) =>
  ApiClient.delete("/admin/material/deleteByListId", { data: payload });

export const requestPostCreateMaterial = (payload: CreateDto) =>
  ApiClient.post("/admin/material/create", payload);
