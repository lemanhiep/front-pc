import { ApiClient } from "./ApiService";

export const requestUploadImage = (payload: any) =>
  ApiClient.post("/uploadFile", payload);
