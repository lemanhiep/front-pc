import { ApiClient } from "../../../service/ApiService";

export const requestGetAccountById = (payload?: { id: number }) =>
  ApiClient.get("/account/findById", { params: payload });
