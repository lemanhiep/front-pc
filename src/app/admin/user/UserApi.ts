import { ApiClient } from "../../service/ApiService";
// interface
export interface UpdateDto {
  email?: string,
  fullName?: string,
  id?: number,
  isActive?: boolean,
  password?: string,
}

export interface CreateDto {
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string;
  role: string;
  username: string;
}

// function
export const requestGetUserAll = (payload?: any) =>
  ApiClient.get("/admin/account/findAll", payload);

export const requestPutUpdateUser = (payload: UpdateDto) =>
  ApiClient.put("/admin/account/update", payload);

export const requestDeleteUser = (payload: { accountIdList: number[] }) =>
  ApiClient.put("/admin/account/deleteByArrayId", payload);

export const requestPostCreateUser = (payload: CreateDto) =>
  ApiClient.post("/admin/account/createAdminAccount", payload);

export const requestGetUserStatistic = (payload?: any) =>
  ApiClient.get("/admin/account/accountSatistic", payload);
