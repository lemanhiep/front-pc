import { ApiClient } from "../../service/ApiService";
// interface
export interface UpdateDto {
  id: number;
  isDelete: boolean;
  tagName: string;
  isActive: boolean;
}

export interface CreateDto {
  tagName: string;
}

// function
export const requestGetTagAll = (payload?: any) =>
  ApiClient.get("/admin/tag/findAll", payload);

export const requestPutUpdateTag = (payload: UpdateDto) =>
  ApiClient.put("/admin/tag/update", payload);

export const requestDeleteTag = (payload: { tagIdList: number[] }) =>
  ApiClient.delete("/admin/tag/deleteByListId", { data: payload });

export const requestPostCreateTag = (payload: CreateDto) =>
  ApiClient.post("/admin/tag/create", payload);
