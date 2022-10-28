import { ApiClient } from "../../service/ApiService";
// interface
export interface UpdateDto {
  id: number;
  isDelete: boolean;
  categoryName: string;
  categoryParentId: number | null;
  isActive: boolean;
}

export interface CreateDto {
  categoryName: string;
  categoryParentId: number | null;
}

// function
export const requestGetCategoryAll = () =>
  ApiClient.get("/admin/category/findAllCategoryParentId", {});

export const requestPutUpdateCategory = (payload: UpdateDto) =>
  ApiClient.put("/admin/category/update", payload);

export const requestDeleteCategory = (payload: { listCategoryId: number[] }) =>
  ApiClient.delete("/admin/category/deleteByListId", { data: payload });

export const requestPostCreateCategory = (payload: CreateDto) =>
  ApiClient.post("/admin/category/create", payload);
