import axios from "axios";
import { BaseUrl } from "../contant/Contant";
import { ResultApi } from "../contant/IntefaceContaint";
import { requestUploadImage } from "./ApiAll";

export const handleGet = async (url: string, payload?: any) => {
  return await axios
    .get(`${BaseUrl + url}`, { params: payload })
    .then((response) => {
      return response;
    });
};

export const handlePost = async (url: string, payload?: any) => {
  return await axios.post(`${BaseUrl + url}`, payload).then((response) => {
    return response;
  });
};
export const handlePut = async (url: string, payload?: any) => {
  return await axios.put(`${BaseUrl + url}`, payload).then((response) => {
    return response;
  });
};

export const handleUploadImage = async(file: any) =>{
  const formData = new FormData()
  formData.append("file",file)
  const res: ResultApi<string> = await requestUploadImage(formData)
  return res.data
}

export {};
