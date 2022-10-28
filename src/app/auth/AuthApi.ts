import { ApiClient } from "../service/ApiService";

//interface
export interface LoginRequest {
  password: string;
  username: string;
}

export interface ResultLogin {
  email: string;
  id: number;
  roles: string;
  token: string;
  username: string;
}

export interface RegisterDto {
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string;
  role: string;
  username: string;
  code: number,
}

export interface ForgotPassword{
  code: number
  phone_number: string
  password: string
  confirm: string
}

// function
export const requestLoginApp = (payload: LoginRequest) =>
  ApiClient.post("/auth/authenticate", payload);

export const requestPostRegister = (payload: RegisterDto) =>
  ApiClient.post("/account/createAccount", payload);

export const requestVerifyPhone = (payload: {phone: string}) =>
ApiClient.post(`/account/verify?phone_number=${payload.phone}`, {});

export const requestSendPhone = (payload: {phone_number: string}) =>
ApiClient.get(`/account/sendCode`, {params: payload});

export const requestForgotPassword = (payload: ForgotPassword) =>
ApiClient.get(`/account/forgotPassword`, {params: payload});
